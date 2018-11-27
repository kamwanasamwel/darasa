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


var atdata = document.getElementById('attdlist');
var nos = 0;

document.getElementById('clsattd').addEventListener('submit', ClassAttend);
function ClassAttend(e){
    e.preventDefault();
    firestore.collection("StudentScanClass").where("year", "==", document.getElementById('coyear').value).where("semester", "==", document.getElementById('cosem').value).where("course", "==", document.getElementById('cocourse').value).where("yearofstudy", "==", document.getElementById('coyos').value).where("querydate", "==", document.getElementById('datepicker').value)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            nos ++;
            // doc.data() is never undefined for query doc snapshots
            atdata.innerHTML += "<tr><th scope='row'>"+nos+"</th> <td> "+doc.data().regno+" </td> <td> "+doc.data().studname+" </td></tr>"
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}