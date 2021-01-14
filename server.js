const path = require("path");
const http = require("http");
const express = require('express');

const socketio = require('socket.io');
const formatMessage =require('./public/utils/messages');
const{  userJoin,
        getCurrentUser,
        getRoomUsers,
        userLeave,
    } 
=require("./public/utils/users");
const users = require("./public/utils/users");
const botName ="ChatBot";


const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, "public")));

const io = socketio(server);

io.on('connection', socket => {
    socket.on('joinRoom', ({ username , usercolor , room }) => {
      
      const user = userJoin(socket.id, username,usercolor, room);
  
      socket.join(user.room);
  
      // Welcome current user
      socket.emit('message', formatMessage(botName,"black", "Bienvenue au forum du site web : BookStore App!"));
  
      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName,"black", `${user.username} a rejoint le chat!`)
        );
        
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users:getRoomUsers(room),
          }
          );

      
    });

    //Sending messages
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username,user.usercolor, msg));
    });
  
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if (user) {
          io.to(user.room).emit(
            'message',
            formatMessage(botName,"blue", `${user.username} a quitté le chat! `)
          );
    
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
      });
  });
  
  const PORT = process.env.PORT || 3005;
  
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));