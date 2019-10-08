import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-pi4ZLZVnTwK6PWrmG5P1YAzXu9chJLA",
  authDomain: "react-phone-book-project.firebaseapp.com",
  databaseURL: "https://react-phone-book-project.firebaseio.com",
  projectId: "react-phone-book-project",
  storageBucket: "",
  messagingSenderId: "287659876700",
  appId: "1:287659876700:web:40d171357090c8670fa199"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase