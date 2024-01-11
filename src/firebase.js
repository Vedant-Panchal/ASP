import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getAnalytics} from "firebase/analytics"

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAe7RtiOIW9xvC-_ybvXFqigHW_-ny09VA",

  authDomain: "asp2024-5525f.firebaseapp.com",

  projectId: "asp2024-5525f",

  storageBucket: "asp2024-5525f.appspot.com",

  messagingSenderId: "1049435515366",

  appId: "1:1049435515366:web:c52dd578a247b5baddce27",

  measurementId: "G-1JJFQ9MJ4G"

}
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const aspauth = getAuth(app)