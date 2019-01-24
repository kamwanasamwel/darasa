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

var ttitles = document.getElementById('titles');

var atdata = document.getElementById('attdlist');
var nos = 0;

document.getElementById('clsattd').addEventListener('submit', ClassAttend);

function ClassAttend(e) {
    e.preventDefault();
    // add titles
    ttitles.innerHTML = "<h2>Dedan Kimathi University of Science and Technology</h2> <h4>Course: " + document.getElementById('cocourse').value + " Year: " + document.getElementById('coyos').value + " Semester: " + document.getElementById('cosem').value + "</h4><h4>Attendance Sheet for " + document.getElementById('datepicker').value + "</h4>"
    // query data
    // firestore.collection("StudentScanClass").where("unitname", "==", "Project Management ")
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    // old query
    firestore.collection("StudentScanClass").where("year", "==", document.getElementById('coyear').value).where("semester", "==", document.getElementById('cosem').value).where("course", "==", document.getElementById('cocourse').value).where("yearofstudy", "==", document.getElementById('coyos').value).where("querydate", "==", document.getElementById('datepicker').value).where("unitname", "==", document.getElementById('counit').value)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                nos++;
                // doc.data() is never undefined for query doc snapshots
                atdata.innerHTML += "<tr><th scope='row'>" + nos + "</th> <td> " + doc.data().regno + " </td> <td> " + doc.data().studname + " </td></tr>"
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

}
//printing of attendance sheet
document.getElementById("PrintButton").addEventListener("click", PrintResults);

function PrintResults(ptable) {
    console.log("I was clicked and I hope to output an attendance sheet");
    var content = document.getElementById("ptable").innerHTML;
    var mywindow = window.open("", "Print", "height=600,width=800");

    // mywindow.document.write('<html><head><title>Print</title>');
    // mywindow.document.write('</head><body >');
    mywindow.document.write(content);
    // mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return true;
}