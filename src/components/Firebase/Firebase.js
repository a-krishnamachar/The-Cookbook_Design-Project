import app from "firebase/app";

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
  }
}

export default Firebase;
