import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAmO4dMMRIsrP1TTGB7WN9eUorEHQvY1xU",
  authDomain: "form-an.firebaseapp.com",
  projectId: "form-an",
  storageBucket: "form-an.firebasestorage.app",
  messagingSenderId: "1065881734935",
  appId: "1:1065881734935:web:f0e67edceb0cc0864e7152"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };