import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ---------------------------------------------------------
// STEP 1: Insert your Firebase config here ↓↓↓
// ---------------------------------------------------------

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APPID"
};

// ---------------------------------------------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const startBtn = document.getElementById("startNav");
const nextBtn = document.getElementById("nextBtn");
const navImage = document.getElementById("navImage");

let currentStep = 0;
let steps = [];

startBtn.addEventListener("click", async () => {
  const currentLocation = document.getElementById("currentLocation").value;
  const destination = document.getElementById("destination").value;

  if (!currentLocation || !destination) {
    alert("Please select both locations.");
    return;
  }

  const docId = `${currentLocation}-${destination}`;

  const ref = doc(db, "routes", docId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("Route not found in database!");
    return;
  }

  steps = snap.data().steps;
  currentStep = 0;

  navImage.style.display = "block";
  navImage.src = steps[currentStep];

  nextBtn.style.display = "block";
});

nextBtn.addEventListener("click", () => {
  currentStep++;

  if (currentStep >= steps.length) {
    alert("You reached your destination!");
    navImage.style.display = "none";
    nextBtn.style.display = "none";
    return;
  }

  navImage.src = steps[currentStep];
});

