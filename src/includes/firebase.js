import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDzq0kS69gK7Qmaon0vi9GInWWegsPsdJE",
  authDomain: "spectracl-a72c0.firebaseapp.com",
  projectId: "spectracl-a72c0",
  storageBucket: "spectracl-a72c0.appspot.com",
  messagingSenderId: "96891023405",
  appId: "1:96891023405:web:d9ef76a07acbc32fec48a4",
  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`firebase persistance error ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, storage, songsCollection, commentsCollection }
