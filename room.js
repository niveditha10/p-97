
var firebaseConfig = {
      apiKey: "AIzaSyBHotio-NQjAoguQaO4aP1UKBCMqLfb_Eg",
      authDomain: "lets-chat-f99ef.firebaseapp.com",
      databaseURL: "https://lets-chat-f99ef-default-rtdb.firebaseio.com",
      projectId: "lets-chat-f99ef",
      storageBucket: "lets-chat-f99ef.appspot.com",
      messagingSenderId: "267873514729",
      appId: "1:267873514729:web:bb71707c750eb32bcaac78",
      measurementId: "G-4FRZCK513Q"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
   


    

user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="welcome "+user_name+" !";

function addRoom(){

room_name=document.getElementById("room_name").value;
firebase.database().ref("/").child(room_name).update({
      purpose:"room_name"
});
localStorage.setItem("room_name",room_name);
window.location="talk.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       room_names = childKey;
      console.log(room_names);
      row="<div class='room_name' id="+room_names+" onclick='redirect(this.id)'>#"+room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;     

      });});}
getData();


function redirect(name){
      console.log(name);
      localStorage.setItem("room_name",name);
window.location="talk.html";
document.getElementById("room_name").value="";
}

function logout(){

      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="login.html";

}
