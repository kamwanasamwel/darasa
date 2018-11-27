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



// listing of courses array on drop down

// var dcourse = document.getElementById('ccourse');
// var crsRef = firestore.collection("DkutCourses").doc("dkut");

// crsRef.get().then(function(doc) {
//     if (doc.exists) {
//       var i;
//       for (i = 1; i < 25; i++) { 
//         dcourse.innerHTML += "<option>"+ doc.data()[i] +"</option>"; 
//       }
//       // dcourse.innerHTML += "<option>"+ doc.data() +"</option>";
//         console.log("Document data:", doc.data());
//         console.log("the length is:", doc.length);
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

var coyear = document.getElementById('cyear');
var cosem = document.getElementById('csem');
var cocourse = document.getElementById('ccourse');
var coyos = document.getElementById('cyos');

document.getElementById('clslist').addEventListener('submit', ClassList);
function ClassList(e){
    e.preventDefault();
    firestore.collection("StudentDetails").where("currentyear", "==", document.getElementById('cyear').value).where("currentsemester", "==", document.getElementById('csem').value).where("course", "==", document.getElementById('ccourse').value).where("yearofstudy", "==", document.getElementById('cyos').value)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}