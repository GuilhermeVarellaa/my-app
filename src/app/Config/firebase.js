import firebase from 'firebase/app';
//import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBb_c_xuGupkeHHLZgCd3ongpEZfLCZ8gE",
  authDomain: "projeto-taugor-d0418.firebaseapp.com",
  projectId: "projeto-taugor-d0418",
  storageBucket: "projeto-taugor-d0418.appspot.com",
  messagingSenderId: "520554104333",
  appId: "1:520554104333:web:f6cf107c1d1621e7f43744",
  measurementId: "G-E7ECN8312N"
};
  
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
