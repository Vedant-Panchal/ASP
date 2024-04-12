import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getAnalytics} from "firebase/analytics"
import {getFirestore} from "firebase/firestore"
import { getMessaging,getToken  } from "firebase/messaging";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const aspauth = getAuth(app)
export const db = getFirestore()
export const storage = getStorage()
// export const notification = getMessaging(app)
// getToken(notification,{vapidKey:"BKFWW0XQAShzIpK9AlltOoKLFv9wvzL6pIYHugz4Xg07UAAFWSPk_bXDRS3AxpAVRTqdSWeGB0ii5DEDJLpnllg"})