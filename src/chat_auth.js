import { auth } from "./src/firebase-init.js";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "./index.html";
  } else {
    console.log("User logged in:", user.email);
  }
});
