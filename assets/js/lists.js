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
var ttitle = document.getElementById("title");
var todata = document.getElementById("tdata");
var nos = 0;

document.getElementById("clslist").addEventListener("submit", ClassList);

function ClassList(e) {
  e.preventDefault();
  // add titles
  ttitle.innerHTML =
    "<h2 style='margin=0px;'>Dedan Kimathi University of Science and Technology</h2> <h4 style='margin=0px;'>Course: " +
    document.getElementById("ccourse").value +
    " Year: " +
    document.getElementById("cyos").value +
    " Semester: " +
    document.getElementById("csem").value +
    "</h4><h4 margin-top:-5px; margin-bottom: 0px;>Class List</h4>";
  firestore
    .collection("StudentDetails")
    .where("currentyear", "==", document.getElementById("cyear").value)
    .where("currentsemester", "==", document.getElementById("csem").value)
    .where("course", "==", document.getElementById("ccourse").value)
    .where("yearofstudy", "==", document.getElementById("cyos").value)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        nos++;
        var space = "    ";
        // doc.data() is never undefined for query doc snapshots
        todata.innerHTML +=
          "<tr></tr><th scope='row' width='20'>" +
          nos +
          "</th> <td width='150'> " +
          doc.data().regnumber +
          " </td> <td width='120'> " +
          doc.data().firstname +
          " " +
          doc.data().lastname +
          " </td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td><td width='40'></td></tr>";
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}

// downloading of attendance list
document.getElementById("DownloadButton").addEventListener("click", PrintPDF);
document.getElementById("PrintButton").addEventListener("click", PrintResults);
function PrintPDF(e, ptable) {
  e.preventDefault();
  console.log("Am clicked.. Hoping I will generate PDF");
  var doc = new jsPDF();
  var specialElementHandlers = {
    "#editor": function(element, renderer) {
      return true;
    }
  };
  doc.fromHTML($("#ptable").html(), 15, 15, {
    width: 230,
    elementHandlers: specialElementHandlers
  });
  doc.save();
}

function PrintResults(ptable) {
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
