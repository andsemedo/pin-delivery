module = {};
    module.test = 'teste'

// Import the functions from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChieldAdded, onChieldRemoved } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO1ZtCF0Vbz1CdbhJzlFVN29uEU3gVbcc",
  authDomain: "chat-pin-delivery.firebaseapp.com",
  projectId: "chat-pin-delivery",
  storageBucket: "chat-pin-delivery.appspot.com",
  messagingSenderId: "130275241010",
  appId: "1:130275241010:web:541b2a714b9fea0c71602b",
  measurementId: "G-T22ET6CE0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

let msgText = document.getElementById('msgText');
let sender = sessionStorage.getItem('sender');

// Send Message
module.sendMsg = function sendMsg() {
    var msg = msgText.value
    var timestamp = new Date().getTime()
    set(ref(db, "message/"+timestamp), {
        msg: msg,
        sender: sender
    })
}

console.log(module);