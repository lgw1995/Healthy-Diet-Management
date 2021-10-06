import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyABbRqSbplVk9F8v3_z8s0oVvZ4EHagZvI",
    authDomain: "cs385-food.firebaseapp.com",
    databaseURL: "https://cs385-food.firebaseio.com",
    projectId: "cs385-food",
    storageBucket: "cs385-food.appspot.com",
    messagingSenderId: "474881580756",
    appId: "1:474881580756:web:9f52c9aac8181fe52e2541"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;