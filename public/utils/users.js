const users=[];

function userJoin(id,username,usercolor,room){
    const user={id,username,usercolor,room};
    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function getCurrentUserColor(id){
  const user =users.find(user1 => user1.id === id);
  return user.usercolor;
}

//Getting the users of a room
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
  }
//User leave chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }


module.exports ={
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave,
    getCurrentUserColor
}