import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  runTransaction
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

var MONEY_DIVISORS = {
  breakout: 8,
  snake: 1.5,
  'car-dodge': 7,
  tetris: 8.5,
  'number-baseball': 10,
  reaction: 4.5,
  'aim-trainer': 5,
  'simon-says': 5,
  minesweeper: 4,
  'burger-stack': 5
};

export function moneyFromScore(game, score) {
  var divisor = MONEY_DIVISORS[game] || 10;
  return Math.max(0, Math.round(score / divisor));
}

function walletRef(name) {
  return doc(db, "wallets", name);
}

export async function getWallet(name) {
  try {
    var snap = await getDoc(walletRef(name));
    if (snap.exists()) return snap.data();
    return { money: 0, owned: [] };
  } catch (e) {
    console.error("wallet fetch failed", e);
    return { money: 0, owned: [] };
  }
}

export async function addMoney(name, amount) {
  if (amount <= 0) return null;
  try {
    var result = null;
    await runTransaction(db, async function(tx) {
      var ref = walletRef(name);
      var snap = await tx.get(ref);
      var data = snap.exists() ? snap.data() : { money: 0, owned: [] };
      var newMoney = (data.money || 0) + amount;
      var payload = { money: newMoney, owned: data.owned || [] };
      tx.set(ref, payload);
      result = payload;
    });
    return result;
  } catch (e) {
    console.error("addMoney failed", e);
    return null;
  }
}

export async function purchaseItem(name, itemId, price) {
  try {
    var success = false;
    var finalWallet = null;
    await runTransaction(db, async function(tx) {
      var ref = walletRef(name);
      var snap = await tx.get(ref);
      var data = snap.exists() ? snap.data() : { money: 0, owned: [] };
      var owned = data.owned || [];
      if (owned.indexOf(itemId) !== -1) {
        success = true;
        finalWallet = data;
        return;
      }
      if ((data.money || 0) < price) {
        success = false;
        finalWallet = data;
        return;
      }
      var payload = { money: data.money - price, owned: owned.concat([itemId]) };
      tx.set(ref, payload);
      success = true;
      finalWallet = payload;
    });
    return { success: success, wallet: finalWallet };
  } catch (e) {
    console.error("purchaseItem failed", e);
    return { success: false, wallet: null };
  }
}

export async function setEquipped(name, slot, itemId) {
  try {
    var result = null;
    await runTransaction(db, async function(tx) {
      var ref = walletRef(name);
      var snap = await tx.get(ref);
      var data = snap.exists() ? snap.data() : { money: 0, owned: [] };
      var equipped = data.equipped || {};
      equipped[slot] = itemId;
      var payload = { money: data.money || 0, owned: data.owned || [], equipped: equipped };
      tx.set(ref, payload);
      result = payload;
    });
    return result;
  } catch (e) {
    console.error("setEquipped failed", e);
    return null;
  }
}
