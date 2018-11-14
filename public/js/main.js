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

var settings = { timestampsInSnapshots: true }; 
   firestore.settings(settings);

// authentication
var user = firebase.auth().currentUser;
function authenticate(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("first log", user.uid);
    } else {
      window.location.href="login.html";
    }
  });
  }
  
  window.onload=authenticate();
// adding pdf doc




// getting uid
// var uid;

// if (user != null) {
//   uid = user.uid; 
//   console.log(uid);
// }

// class time
var rclst = document.getElementById('clst');

// full statement to get user id: firebase.auth().currentUser.uid
firestore.collection("LecTeachTime").where("lecid", "==", "bhmsGO4GadUoc85r8q05xWGbLn93")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            console.log("After Lec Teach data:", doc.data());
            console.log("once again", doc.data().lecid);
            rclst.innerHTML += "<option>"+ doc.data().time +"</option>"
            
        });
    })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

// on click listener
document.getElementById('AttendData').addEventListener('submit', submitForm);

function inputVal(id){
  return document.getElementById(id).value;
}

function submitForm(e){
// var acadyear = firestore.collection(Dkut).doc(acadyear);
// then save it to as a record

  e.preventDefault();
  // var user = firebase.auth().currentUser;
  var ryear = inputVal('yer');
  // var rcourse = inputVal('course');
  // var rsem = inputVal('semester');
  let rsem = document.querySelector('semester');
  // var rcode = inputVal('code');
  

  var user = firebase.auth().currentUser;  
  // var umail = user.email;
  var usid = user.uid;
  var dclasstime;
  var dscanid;
  var StudId;
  
  
  // console.log("Ultimate test", firebase.auth().currentUser.uid);
  // compare values;
  firestore.collection("StudentScanClass").where("semester", "==", document.getElementById('semester').value )
  .where("year", "==", document.getElementById('yer').value ) 
  .get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // .where("date", ">=", moment().format(document.getElementById('clst').value ))
        console.log("Scan data:", doc.data());
        dclasstime = doc.data().classtime;
        dscanid = doc.id;
        StudId = doc.data().studentid;
        console.log(dclasstime);
        console.log(dscanid);
        console.log(StudId);
        // query two
        // .where("doc().id", "array-contains", "2ioLaiqDk7HbkXkTMc5x")
        // end query two 
        // 'StudentScanClassId.' + 'studentid', "==", true
        
    });
  }).then(function(StudId){
    firestore.collection("StudentDetails")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              console.log("On Student Details data:", doc.data());
              
          });
      })
  });
  // firestore.collection("StudentDetails").where("doc.id","==","Scan.studentid")
  //     .get()
  //     .then(function(querySnapshot) {
  //         querySnapshot.forEach(function(doc) {
  //             // doc.data() is never undefined for query doc snapshots
  //             // console.log(doc.id, " => ", doc.data());
  //             console.log("On Student Details data:", doc.data());
              
  //         });
  //     })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   });  
  //   console.log("return output", Scans);
  



}


// generation of class list
// list courses on the dropdown

  var dcourse = document.getElementById('ccourse');
  var crsRef = firestore.collection("DkutCourses").doc("dkut");

  crsRef.get().then(function(doc) {
      if (doc.exists) {
        var i;
        for (i = 1; i < 25; i++) { 
          dcourse.innerHTML += "<option>"+ doc.data()[i] +"</option>"; 
        }
        // dcourse.innerHTML += "<option>"+ doc.data() +"</option>";
          console.log("Document data:", doc.data());
          console.log("the length is:", doc.length);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

//   firestore.collection("DkutCourses").doc("dkut").get().then(function(querySnapshot) {      
//     console.log(querySnapshot.doc.length); 
// });
  // firestore.collection("DkutCourses").doc("dkut").get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // rtunit.innerHTML = "<h2 class='color-white'>" + querySnapshot.size +
  //         //     "</h2> <p class='m-b-0'>Units Taught</p>";
  //         console.log(querySnapshot.size);
  //     });
  // });
  // firestore.collection("DkutCourses").doc("dkut")
  //   .get()
  //   .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //           // doc.data() is never undefined for query doc snapshots
  //           // console.log(doc.id, " => ", doc.data());
  //           console.log("After Lec Teach data:", doc.data());
  //           dcourse.innerHTML += "<option>"+ doc.data() +"</option>"
            
  //       });
  //   })
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });

// query from student details
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

var printpdf = document.getElementById('dispdata');
  document.getElementById('ListData').addEventListener('submit', ClassList);
  function ClassList(e){
    e.preventDefault();
    firestore.collection("StudentDetails").where("currentyear","==",document.getElementById('cyear').value).where("currentsemester","==",document.getElementById('csemester').value).where("course","==",document.getElementById('ccourse').value)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              printpdf.innerHTML += "<tr><td>"+ doc.data().regnumber +"</td><td>"+ doc.data().firstname +"</td><td>"+ doc.data().lastname +"</td><td></td><td></td><td></td><td></td></tr>";
              console.log("On Student Details data:", doc.data());
              console.log("On Student Details data:", doc.data().lastname);
              
          });
          return doc.data();
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });  
    doc.fromHTML($('#content').html(), 15, 15, {
      'width': 230,
          'elementHandlers': specialElementHandlers
  });
  doc.save();
  }
    

 
// generate pdf print out






 

  