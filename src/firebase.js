import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRVZ1SmYEkDS22dJShkfctd_HyXE7qYLY",
  authDomain: "data-table-9b6df.firebaseapp.com",
  projectId: "data-table-9b6df",
  storageBucket: "data-table-9b6df.appspot.com",
  messagingSenderId: "274520344219",
  appId: "1:274520344219:web:011b8bb313bf74f1b7283e",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const timestamp = serverTimestamp();

export { app, firestore, storage, timestamp };
