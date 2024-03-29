import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoTkyvdkWbcG5mHi5PZaQVF_5bjjseApI",
  authDomain: "footixvibe-62c41.firebaseapp.com",
  projectId: "footixvibe-62c41",
  storageBucket: "footixvibe-62c41.appspot.com",
  messagingSenderId: "180868315060",
  appId: "1:180868315060:web:02dc467b747d4a7ee364e1",
  measurementId: "G-38X577TXGD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        //name: user.name,
        authProvider: "google",
        //email: user.email,
        identifier: user.email,
      });
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const handleAuthStateChange = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const timeoutDuration = 4 * 60 * 60 * 1000;
      setTimeout(() => {
        signOut(auth);
        localStorage.removeItem("user");
      }, timeoutDuration);
    }
  });
};

const handleWindowUnload = () => {
  signOut(auth);
  localStorage.removeItem("user");
};

const logout = () => {
  signOut(auth);
};

export {
  db,
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  handleAuthStateChange,
  handleWindowUnload,
  logout,
};