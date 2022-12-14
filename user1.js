//import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

let firebaseConfig = {
  apiKey: "AIzaSyBU5Vd-RaQOpp8dGHyRrHLfjqE6xnBGUMA",
  authDomain: "moviedatabase-ab7d3.firebaseapp.com",
  projectId: "moviedatabase-ab7d3",
  storageBucket: "moviedatabase-ab7d3.appspot.com",
  messagingSenderId: "839032877350",
  appId: "1:839032877350:web:ad17917ae07de89bc8d1e7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
// Set up our register function
async function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
  }
  try {
    const usersRef = database.ref("users/" + email.split("@")[0]);
    var user_data = {
      email: email,
      full_name: full_name,
      password: password,
      role: "user",
      last_login: new Date().toLocaleString(),
      ticketCount: 0
    };
    await usersRef.set(user_data);
    //await auth.createUserWithEmailAndPassword(email, password);
    alert("User Created!!");
  } catch (err) {
    alert(err);
  }
}

// Set up our login function
async function login() {
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
    var user_data = {
      last_login: new Date().toLocaleString(),
    };
    const usersRef = database.ref("users/" + email.split("@")[0]);
    usersRef.on(
      "value",
      async (snapshot) => {
        if (
          !snapshot.val() ||
          snapshot.val().email !== email ||
          snapshot.val().password !== password
        ) {
          alert("wrong credentials");
          return;
        }
        await usersRef.update(user_data);
        localStorage.setItem("user", email);
        open("select.html", function (err) {
          if (err) throw err;
        });
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

// Validate Functions
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
