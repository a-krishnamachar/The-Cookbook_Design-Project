import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBzIJuKQbc6kssGhM6153KwEcdIG7SxNnk",
  authDomain: "thecookbook-b1469.firebaseapp.com",
  projectId: "thecookbook-b1469",
  storageBucket: "thecookbook-b1469.appspot.com",
  messagingSenderId: "1056794751543",
  appId: "1:1056794751543:web:7213fc50b8f2d5c54e85b2",
  measurementId: "G-5PCJGKGJML",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIS */

    this.auth = app.auth();
    this.db = app.firestore();
  }

  /* Auth API */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data();

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  /* User API */

  user = (uid) => this.db.doc(`users/${uid}`);

  users = () => this.db.collection("users");
}

export default Firebase;
