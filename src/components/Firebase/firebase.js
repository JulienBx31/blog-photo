import app from 'firebase/app';

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
    }
  }
  export default Firebase;