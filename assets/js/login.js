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

// login scripts
// var birdAlert = new BirdAlert({
// 	position: 'top right'
// });
$('#LoginButton').click(function (e) {
    e.preventDefault();
    var remail = document.getElementById('InputEmail').value;
    var rpass = document.getElementById('InputPassword').value; 

    firebase.auth().signInWithEmailAndPassword(remail, rpass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("there was an error: ",errorMessage)
        console.log("error code: ", errorCode)
    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            const usersRef = firestore.collection('LecUser').doc(user.uid);

            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    window.location = 'lecturer.html';
                    // do stuff with the data
                });
                } 
                else {
                    swal("Authentication Error!", "Wrong Email or password | You are not a registered Lecturer!", "error");
                }
            });
        // window.location = 'lecturer.html';
        }
    });
});