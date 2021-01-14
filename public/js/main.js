const chatForm = document.getElementById('chat-form');
const ChatMessages=document.querySelector(".chat-messages");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const roomNumbers = document.getElementById("room-numbers");

/*const username = document.getElementById('chat-name');

username.addEventListener("submit", e => {
    e.preventDefault();
    const username1 = e.target.elements.username.value;
    console.log(username1);
    socket.emit("Username", username1);
})*/

//Get username,usercolor and  room from URL
const socket = io();
const {username,usercolor, room}= Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

console.log(username,usercolor,room);

socket.emit("joinRoom",{username,usercolor,room});

socket.on("message", message => {
    console.log("le message est:"+message.usercolor);
    outputMessage(message);

    ChatMessages.scrollTop=ChatMessages.scrollHeight;
})

//Room users
socket.on('roomUsers', ({ room,users }) => {
    outputRoomName(room);
    outputUsers(users);
    outputRoomNumbers(users.length);
  });

//Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();
  
    // Get message text
    let msg = e.target.elements.msg.value;
    
    msg = msg.trim();
    
    if (!msg){
      return false;
    }
  
    // Emit message to server
    socket.emit('chatMessage', msg);
    console.log(msg);
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  })

//fixed bugs
//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerHTML = `<span style="color:${message.usercolor}">${message.username}</span>`;
    p.innerHTML += `<span style="float: right;">${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }



  function outputRoomName(room){
        roomName.innerHTML= room;
  }
  function outputRoomNumbers(Numbers){
    roomNumbers.innerHTML=Numbers ;
}

  function outputUsers(users){
      userList.innerHTML='';
      users.forEach(user=>{
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
      });
  }