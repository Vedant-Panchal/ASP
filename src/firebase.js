import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhlsQ97T1XVWiU1wPkM8njcpKmh1BHYGw",
  authDomain: "asp-test-d367c.firebaseapp.com",
  projectId: "asp-test-d367c",
  storageBucket: "asp-test-d367c.appspot.com",
  messagingSenderId: "915854181766",
  appId: "1:915854181766:web:a0c45aae5a3ae3c50d9807",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const aspauth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
