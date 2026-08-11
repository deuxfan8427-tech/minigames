import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  limit,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqXK6qkio6DJDPi76kcTNjQJWyqfxvK-w",
  authDomain: "minigames-d95ac.firebaseapp.com",
  projectId: "minigames-d95ac",
  storageBucket: "minigames-d95ac.firebasestorage.app",
  messagingSenderId: "932985257697",
  appId: "1:932985257697:web:82ae9691beeff13065c1a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function submitScore(game, name, score, extra) {
  try {
    var doc = {
      game: game,
      name: name,
      score: score,
      ts: serverTimestamp()
    };
    if (extra) {
      for (var key in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, key)) doc[key] = extra[key];
      }
    }
    await addDoc(collection(db, "scores"), doc);
    return true;
  } catch (e) {
    console.error("leaderboard submit failed", e);
    return false;
  }
}

export async function fetchTop10(game) {
  try {
    const q = query(collection(db, "scores"), where("game", "==", game), limit(500));
    const snap = await getDocs(q);
    const list = snap.docs.map(function (d) { return d.data(); });
    list.sort(function (a, b) { return b.score - a.score; });
    return list.slice(0, 10);
  } catch (e) {
    console.error("leaderboard fetch failed", e);
    return [];
  }
}
