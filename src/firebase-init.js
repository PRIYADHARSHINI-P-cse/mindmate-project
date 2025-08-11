import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "firebase/firestore";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// Signup user with role saved in Firestore
export async function signupUser(email, password, role) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    role,
    createdAt: serverTimestamp(),
    profile: {}
  });
  return cred.user;
}

// Login user
export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// Fetch user document
export async function getUserDoc(uid) {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
}

// Save user profile info
export async function saveUserProfile(uid, profile) {
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, { profile }, { merge: true });
}

// Mood tracker functions
export async function saveMood(uid, mood, note) {
  const col = collection(db, "users", uid, "moods");
  await addDoc(col, { mood, note, ts: serverTimestamp() });
}

export async function getMoods(uid) {
  const col = collection(db, "users", uid, "moods");
  const q = query(col, orderBy("ts", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
