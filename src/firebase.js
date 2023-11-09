import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANaYQBfGgW0T7aiAgylYoj0eSDzelVNkc",
  authDomain: "calendarus-10008.firebaseapp.com",
  projectId: "calendarus-10008",
  storageBucket: "calendarus-10008.appspot.com",
  messagingSenderId: "472734992403",
  appId: "1:472734992403:web:b298f3f93a722bddab17e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const USERS_REF = 'users/'
export const CALENDARS_REF = 'calendars/';
//const auth = auth();
