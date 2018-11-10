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
  

var rclass = document.querySelector("#tclasst");

firestore.collection("class").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    // console.log("the first code is", doc.data().Code)
      rclass.innerHTML += "<td class='mdl-data-table__cell--non-numeric'>"+ doc.data().Code +
      "</td><td class='mdl-data-table__cell--non-numeric'>"+ doc.data().Combined +
      "</td><td class='mdl-data-table__cell--non-numeric'>"+ doc.data().Course +
      "</td><td class='mdl-data-table__cell--non-numeric'>"+ doc.data().Department +
      "</td><td class='mdl-data-table__cell--non-numeric'>"+ doc.data().School +
      "</td><td class='mdl-data-table__cell--non-numeric'>"+ doc.data().Semester +
      "</td><td class='mdl-data-table__cell--non-numeric'>"+ doc.data().StudyYear +
      "</td>"
  });
});