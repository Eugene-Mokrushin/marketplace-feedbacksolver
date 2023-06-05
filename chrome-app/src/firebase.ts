import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXeaCliWW0OZoLREMNSmsM4Ix_irMUTsc",
  databaseURL: "https://feedback-solver-dev-default-rtdb.europe-west1.firebasedatabase.app/",
  authDomain: "feedback-solver-dev.firebaseapp.com",
  projectId: "feedback-solver-dev",
  storageBucket: "gs://feedback-solver-dev.appspot.com",
  messagingSenderId: "856700402124",
  appId: "1:856700402124:web:b61ffed05da31162e10569",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = "en";
export const db = getDatabase(app);
export default app;
