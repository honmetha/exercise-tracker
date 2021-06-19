import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyCPjYnqkUONz0hXlhyt534BTKel_w_8jEw",
  authDomain: "workout-tracker-13609.firebaseapp.com",
  projectId: "workout-tracker-13609",
  storageBucket: "workout-tracker-13609.appspot.com",
  messagingSenderId: "326217281458",
  appId: "1:326217281458:web:946faa16116346f7fafeab",
  measurementId: "G-E1DGYX9T91",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  /*** Authentication  ***/
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  /*** Database ***/
  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;
