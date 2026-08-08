import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  initializeFirestore,
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs,
  writeBatch
} from "firebase/firestore";
import firebaseConfigData from "@/firebase-applet-config.json";
import { 
  Siswa, 
  Mapel, 
  Jadwal, 
  LogAbsensi, 
  DataNilai, 
  JurnalAgenda, 
  SiswaBimbingan, 
  BimbinganWali, 
  Pengaturan 
} from "../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData?.apiKey || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData?.authDomain || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData?.projectId || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData?.storageBucket || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData?.messagingSenderId || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData?.appId || ""
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use explicit firestoreDatabaseId with auto detect long polling for iframe stability
const dbId = import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigData?.firestoreDatabaseId || "(default)";

// Original Owner & Master Database Security Restriction
const PRIMARY_DATABASE_ID = "ai-studio-edadminproadmini-69e4b793-99de-48d3-9856-a254bc94afa3";
const PRIMARY_APPLET_ID = "69e4b793-99de-48d3-9856-a254bc94afa3";

/**
 * Validates whether the current runtime environment is authorized to access the primary master database.
 * If this project is cloned/remixed by another user or run under a different applet environment,
 * access to the original master database is blocked to prevent data leaks or unauthorized mutations.
 */
export function checkDatabaseAuthorization(): { authorized: boolean; reason?: string } {
  const currentDbId = import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigData.firestoreDatabaseId || "(default)";
  const currentProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData.projectId;
  const isCustomEnvSet = Boolean(import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_PROJECT_ID);
  
  // If the project has been reconfigured with its own separate database via env or custom config, allow connection to its own instance
  if (isCustomEnvSet || (currentDbId !== PRIMARY_DATABASE_ID && currentProjectId !== "ai-studio-edadminproadmini-69e4b793-99de-48d3-9856-a254bc94afa3")) {
    return { authorized: true };
  }

  // If using the primary master database ID, verify environment ownership
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // Check if running in original environment (development or preview app) or authorized session
    const isOriginalHost = 
      host.includes("679436297026") || 
      host.includes(PRIMARY_APPLET_ID) || 
      host === "localhost" || 
      host === "127.0.0.1";

    if (!isOriginalHost) {
      return { 
        authorized: false, 
        reason: "Akses ke database utama dibatasi untuk environment resmi. Aplikasi remix/salinan wajib menggunakan kredensial database sendiri (via file .env / Environment Variables VITE_FIREBASE_*)." 
      };
    }
  }

  return { authorized: true };
}

let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true
  }, dbId);
} catch {
  firestoreInstance = getFirestore(app, dbId);
}

export const firestore = firestoreInstance;

// Collections references
export const COLLECTIONS = {
  SISWA: "data_siswa",
  MAPEL: "mapel",
  JADWAL: "jadwal",
  LOG_ABSENSI: "log_absensi",
  DATA_NILAI: "data_nilai",
  JURNAL_AGENDA: "jurnal_agenda",
  SISWA_BIMBINGAN: "siswa_bimbingan",
  BIMBINGAN_WALI: "bimbingan_wali",
  PENGATURAN: "pengaturan"
};

// Generic Realtime Subscription with offline fallback & authorization guard
export function subscribeCollection<T>(collectionName: string, callback: (data: T[]) => void) {
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    console.warn(`[Firestore Security] ${authCheck.reason}`);
    callback([]);
    return () => {};
  }

  const colRef = collection(firestore, collectionName);
  return onSnapshot(
    colRef, 
    (snapshot) => {
      const items: T[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as unknown as T);
      });
      callback(items);
    },
    (error) => {
      console.warn(`Firestore subscription notice on ${collectionName}:`, error?.message || error);
    }
  );
}

// Single Document Save/Update with authorization guard
export async function saveDocument(collectionName: string, id: string, data: Record<string, any>) {
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    throw new Error(authCheck.reason);
  }

  try {
    const docRef = doc(firestore, collectionName, id);
    await setDoc(docRef, { ...data, updatedAt: Date.now() }, { merge: true });
  } catch (err: any) {
    console.error(`Error saving document in ${collectionName}:`, err);
    throw err;
  }
}

// Single Document Delete with authorization guard
export async function deleteDocument(collectionName: string, id: string) {
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    throw new Error(authCheck.reason);
  }

  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
  } catch (err: any) {
    console.error(`Error deleting document in ${collectionName}:`, err);
    throw err;
  }
}

// Batch Save Documents with authorization guard
export async function batchSaveDocuments(collectionName: string, items: Array<{ id: string; [key: string]: any }>) {
  if (!items || items.length === 0) return;
  
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    throw new Error(authCheck.reason);
  }

  try {
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, collectionName, item.id);
      batch.set(docRef, { ...item, updatedAt: Date.now() }, { merge: true });
    });
    await batch.commit();
  } catch (err: any) {
    console.error(`Error batch saving documents in ${collectionName}:`, err);
    throw err;
  }
}

// Pengaturan special helper (Doc ID: "config") with authorization guard
export async function savePengaturan(config: Pengaturan) {
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    throw new Error(authCheck.reason);
  }

  try {
    const docRef = doc(firestore, COLLECTIONS.PENGATURAN, "config");
    await setDoc(docRef, { ...config, updatedAt: Date.now() }, { merge: true });
  } catch (err: any) {
    console.error("Error saving pengaturan:", err);
    throw err;
  }
}

export function subscribePengaturan(callback: (config: Pengaturan) => void) {
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    console.warn(`[Firestore Security] ${authCheck.reason}`);
    return () => {};
  }

  const docRef = doc(firestore, COLLECTIONS.PENGATURAN, "config");
  return onSnapshot(
    docRef, 
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as Pengaturan);
      }
    },
    (error) => {
      console.warn("Firestore pengaturan subscription notice:", error?.message || error);
    }
  );
}

// Clear / Wipe All Collections in Database (Except Configuration) with authorization guard
export async function clearAllDatabaseCollections() {
  const authCheck = checkDatabaseAuthorization();
  if (!authCheck.authorized) {
    throw new Error(authCheck.reason);
  }

  // Set flag in localStorage and Firestore so auto-seeder never re-populates on any device
  localStorage.setItem("edadmin_database_cleared", "true");

  try {
    const configDocRef = doc(firestore, COLLECTIONS.PENGATURAN, "config");
    await setDoc(configDocRef, { isDatabaseCleared: true, updatedAt: Date.now() }, { merge: true });
  } catch (err) {
    console.warn("Could not set isDatabaseCleared flag in pengaturan collection:", err);
  }

  const collectionsToClear = [
    COLLECTIONS.SISWA,
    COLLECTIONS.MAPEL,
    COLLECTIONS.JADWAL,
    COLLECTIONS.LOG_ABSENSI,
    COLLECTIONS.DATA_NILAI,
    COLLECTIONS.JURNAL_AGENDA,
    COLLECTIONS.SISWA_BIMBINGAN,
    COLLECTIONS.BIMBINGAN_WALI
  ];

  const errors: string[] = [];

  for (const colName of collectionsToClear) {
    try {
      const colRef = collection(firestore, colName);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const docs = snapshot.docs;
        try {
          for (let i = 0; i < docs.length; i += 400) {
            const batch = writeBatch(firestore);
            const chunk = docs.slice(i, i + 400);
            chunk.forEach((docSnap) => {
              batch.delete(docSnap.ref);
            });
            await batch.commit();
          }
        } catch (batchErr) {
          console.warn(`Batch delete failed for ${colName}, falling back to individual deletes:`, batchErr);
          for (const docSnap of docs) {
            await deleteDoc(docSnap.ref);
          }
        }
      }
    } catch (err: any) {
      console.error(`Error clearing collection ${colName}:`, err);
      errors.push(`${colName}: ${err?.message || err}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Sebagian koleksi gagal dihapus: ${errors.join(", ")}`);
  }
}
