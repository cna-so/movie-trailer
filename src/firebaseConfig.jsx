import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVcNkE7YfhtFIutoFOuEezFd63WgSHB2Y",
  authDomain: "mobiz-en.firebaseapp.com",
  projectId: "mobiz-en",
  storageBucket: "mobiz-en.appspot.com",
  messagingSenderId: "965698371133",
  appId: "1:965698371133:web:68547088c0a6d1a2963454",
  measurementId: "G-L7EH0R846S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
