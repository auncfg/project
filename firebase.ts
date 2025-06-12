// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCq23KmXGLdvk1FEQGU6ar-L7woqO9Zyjk",
  authDomain: "kiki-62bcc.firebaseapp.com",
  projectId: "kiki-62bcc",
  storageBucket: "kiki-62bcc.firebasestorage.app",
  messagingSenderId: "957372213043",
  appId: "1:957372213043:web:814eea808190a133f74046"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
