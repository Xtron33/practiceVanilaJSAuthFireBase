// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWx1gTH9vzbBvCS4xia5UfN0I6ZB5Boyk",
  authDomain: "authication-with-firebace.firebaseapp.com",
  projectId: "authication-with-firebace",
  storageBucket: "authication-with-firebace.appspot.com",
  messagingSenderId: "60463094527",
  appId: "1:60463094527:web:ac096e34cd51ef3caf0aca"
};

var email = null
var displayName = null
var password = null
var confirm_password = null

var Name = null

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const route = (e) => {
  e = e || window.Event;
  e.preventDefault();
  window.history.pushState({}, '', e.target.href)
  handleLocation()
}

const routes = {
  '/': './pages/main/main.html',
  '/login': './pages/login/login.html',
  '/register': './pages/register/register.html'
}

const handleLocation = async () => {
  const path = window.location.pathname;
  const html = await fetch(routes[path]).then((data) => data.text());
  document.querySelector('.container').innerHTML = html
  if (path === "/login") {
    email = document.querySelector('#email')
    password = document.querySelector('#password')

  }
  else if (path === "/register") {
    email = document.querySelector('#email')
    displayName = document.querySelector('#login')
    password = document.querySelector('#password')
    confirm_password = document.querySelector('#confirm-password')

  }
  else {
    Name = document.querySelector('#name')
    Name.innerHTML = auth.currentUser ? auth.currentUser.displayName : "you not auth"
    const loginout = document.querySelector('#loginout')
    loginout.value = auth.currentUser ? "logout" : "login"
    loginout.addEventListener("click", auth.currentUser ? () => { signOut(auth); handleLocation() } : () => { window.history.pushState({}, '', '/login'); handleLocation() })
    const smile = document.querySelector('#smile')
    smile.innerHTML = auth.currentUser ? ":)" : ":("
    email = null
    password = null
    confirm_password = null
  }
}



function submit(e) {
  const path = window.location.pathname;
  e.preventDefault()
  if (path === "/login") {
    logIn()
  }
  else if (path === "/register") {
    reg()
  }

}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function reg() {
  const reg_email = email.value
  const reg_password = password.value
  const reg_conf = confirm_password.value
  const reg_login = displayName.value
  if (!validateEmail(reg_email)) {
    alert("You'r email not valid")
  }
  else if (reg_password.length < 6) {
    alert("Min password length 6 symbol")
  }
  else {
    if (reg_password !== reg_conf) {
      alert("Password not confirmed")
    }
    else {
      createUserWithEmailAndPassword(auth, reg_email, reg_password).then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName: reg_login })
      }).finally(() => {
        window.history.pushState({}, '', '../')
        handleLocation()
      })
    }
  }


}
function logIn() {
  const reg_email = email.value
  const reg_password = password.value
  if (!validateEmail(reg_email)) {
    alert("You'r email not valid")
  }
  else {
    signInWithEmailAndPassword(auth, reg_email, reg_password).then((userCredential) => {
      const user = userCredential.user;

    }).finally(() => {
      window.history.pushState({}, '', '../')
      handleLocation()
    })
  }

}

const checkAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      window.history.pushState({}, '', '../')
      handleLocation()
    }

  })
}

window.onpopstate = handleLocation;
window.route = route;
window.addEventListener("submit", submit)

checkAuthState();
handleLocation();