import app from 'firebase/app';
import 'firebase/auth';

const config = { 
    apiKey : "AIzaSyBhpBj5WQUcYV4lTgzzXnSeRtzbIlub1oo", 
    authDomain : "blog-photo-35b3f.firebaseapp.com", 
    databaseURL : "https://blog-photo-35b3f.firebaseio.com", 
    projectId : "blog-photo-35b3f" , 
    storageBucket : "blog-photo-35b3f.appspot.com" , 
    messagingSenderId : "661855451825" , 
  } ;

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
  }
  export default Firebase;