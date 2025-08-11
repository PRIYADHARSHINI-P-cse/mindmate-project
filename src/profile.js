import { auth, signupUser, loginUser, getUserDoc } from "./firebase-init.js";
import { onAuthStateChanged } from "firebase/auth";

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("su-email").value;
  const pass = document.getElementById("su-pass").value;
  const role = document.getElementById("su-role").value;

  try {
    const user = await signupUser(email, pass, role);
    alert("Account created. Redirecting to profile...");
    window.location.href = "./profile.html";
  } catch (err) {
    alert("Signup error: " + err.message);
  }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("li-email").value;
  const pass = document.getElementById("li-pass").value;

  try {
    const user = await loginUser(email, pass);
    const userDoc = await getUserDoc(user.uid);
    if (userDoc?.role === "teacher") window.location.href = "./teacher-dashboard.html";
    else window.location.href = "./student-dashboard.html";
  } catch (err) {
    alert("Login error: " + err.message);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) console.log("Logged in:", user.email);
  else console.log("Not logged in");
});
