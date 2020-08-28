import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //conectar a firebase database
  apiKey: "AIzaSyC0_NjFOv91G8lpTnrQsTR-FtvgdGnp29I",
  authDomain: "catch-of-the-day-442b8.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-442b8.firebaseio.com",
});
//crear la conexión para usarla en App.js

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
