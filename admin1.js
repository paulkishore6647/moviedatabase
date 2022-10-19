let firebaseConfig = {
  apiKey: "AIzaSyBU5Vd-RaQOpp8dGHyRrHLfjqE6xnBGUMA",
  authDomain: "moviedatabase-ab7d3.firebaseapp.com",
  projectId: "moviedatabase-ab7d3",
  storageBucket: "moviedatabase-ab7d3.appspot.com",
  messagingSenderId: "839032877350",
  appId: "1:839032877350:web:8c30859829eb463dc8d1e7"
};


// Initialize Firebase

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  try {
    // Validate input fields
    if (
      validate_email(email) == false ||
      validate_password(password) == false
    ) {
      alert("Email or Password is Outta Line!!");
      return;
    }
    //await auth.signInWithEmailAndPassword(email, password);
    const usersRef = database.ref("users/" + email.split("@")[0]);
    usersRef.on(
      "value",
      async (snapshot) => {
        if (
          !snapshot.val() ||
          snapshot.val().email !== email ||
          snapshot.val().password !== password ||
          snapshot.val().role !== "admin"
        ) {
          alert("wrong credentials");
          return;
        }
        let allUsersRef = database.ref("users");
        allUsersRef.on(
          "value",
          async (users_snapshot) => {
            const users=users_snapshot.val();
            const userKeys=Object.keys( users_snapshot.val()) || [];

            const total=userKeys.reduce((acc,user_key)=>{
              return acc+users[user_key].ticketCount;
            },0)
            alert("total tickets : "+total);
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          },
          {
            onlyOnce: true,
          }
        );
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.name);
      },
      {
        onlyOnce: true,
      }
    );
  } catch (err) {
    alert(err);
  }
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// Get all our input fields
/*email = document.getElementById('email').value
     password = document.getElementById('password').value
   
     // Validate input fields
     if (validate_email(email) == false || validate_password(password) == false) {
       alert('Email or Password is Outta Line!!')
       return
       // Don't continue running the code
     }
   
     auth.signInWithEmailAndPassword(email, password)
     .then(function() {
       // Declare user variable
       var user = auth.currentUser
   
       // Add this user to Firebase Database
       var database_ref = database.ref()
   
       // Create User data
       var user_data = {
         last_login : Date.now()
       }
   
       // Push to Firebase Database
       database_ref.child('users/' + user.uid).update(user_data)
   
       // DOne
      // alert('User Logged In!!')
       //<a href="D:\firebase\login.html">user logged</a>
       open( 'select.html', function (err) {
     if ( err ) throw err;    
   });
   
     })
     .catch(function(error) {
       // Firebase will use this to alert of its errors
       var error_code = error.code
       var error_message = error.message
   
       alert(error_message)
     })
   }
   
  // Validate Functions
   function validate_email(email) {
     expression = /^[^@]+@\w+(\.\w+)+\w$/
     if (expression.test(email) == true) {
       // Email is good
       return true
     } else {
       // Email is not good
       return false
     }
   }
   
   function validate_password(password) {
     // Firebase only accepts lengths greater than 6
     if (password < 6) {
       return false
     } else {
       return true
     }
   }
   
   function validate_field(field) {
     if (field == null) {
       return false
     }
   
     if (field.length <= 0) {
       return false
     } else {
       return true
     }
   }*/
