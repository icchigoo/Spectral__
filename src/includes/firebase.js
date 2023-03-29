import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDl5a07lRzDowpOzL7eVEyperaQFUQC2U',
  authDomain: 'music-5b4a5.firebaseapp.com',
  projectId: 'music-5b4a5',
  storageBucket: 'music-5b4a5.appspot.com',
  messagingSenderId: '1085678914019',
  appId: '1:1085678914019:web:2b35218aea58700553f8d6'
}

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
