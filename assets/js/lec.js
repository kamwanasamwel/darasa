// Initialize Firebase
var config = {
  apiKey: "AIzaSyATsOBvPIaOwQUfV6WDy4yzm2dRUm-kXdE",
  authDomain: "showcase-3debf.firebaseapp.com",
  databaseURL: "https://showcase-3debf.firebaseio.com",
  projectId: "showcase-3debf",
  storageBucket: "showcase-3debf.appspot.com",
  messagingSenderId: "3641612382"
};
firebase.initializeApp(config);

var firestore = firebase.firestore();
var user = firebase.auth().currentUser;
// var usid;
// //   var usid = user.uid;
// //   console.log(usid);
// if (user != null) {
//   usid = user.uid;
//   console.log(usid);
// } 

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     // hide login button




//     console.log(user.uid);
//   } else {
//     // hide attendance and class list navigation

//     // No user is signed in.
//     console.log("no user");
//   }
// });

var logl = document.getElementById('ablog');
var attendl = document.getElementById('abattend');
var listl = document.getElementById('ablist');
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // hide login button
    logl.style.visibility = "hidden";
    console.log("am a user");

  } else {
    // hide attendance and class list navigation
    attendl.style.visibility = "hidden";
    listl.style.visibility = "hidden";
    console.log("no user");
  }
});