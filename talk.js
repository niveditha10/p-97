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
    room_name=localStorage.getItem("room_name");

    function send(){

      msg=document.getElementById("msg").value;
     firebase.database().ref(room_name).push({ 
           name:user_name,
           message:msg,
           like:0
     });

     document.getElementById("msg").value="";
     }


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
        message_id = childKey;
         message_data = childData;
       console.log(message_id);
       console.log(message_data);
       name=message_data['name'];
       message=message_data['message'];
       likes=message_data['like'];
      name_tag="<h4>"+name+"<img src='tick.gif' class='user_tick'></h4>";
      message_tag="<h4 class='message_h4'>"+message+"</h4>";
      like_button="<button class='btn btn-primary' id="+message_id+" value="+likes+" onclick='update(this.id)'>";
      thumbs="<span class='glyphicon glyphicon-thumbs-up'>like:"+likes+"</span></button><hr>";
      row=name_tag+message_tag+like_button+thumbs;
      document.getElementById("output").innerHTML+=row;

     } });  }); }
getData();

function update(id){
console.log(id);
button_id=id;
like=document.getElementById(button_id).value;
updated_like=Number(like)+1;
firebase.database().ref(room_name).child(id).update({
      like:updated_like
});
}


function logout(){

      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="login.html";

}
