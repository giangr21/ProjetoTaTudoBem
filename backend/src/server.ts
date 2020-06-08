import app from './app';
import { formatMessage } from './utils/messages';
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from './utils/users';

interface IJoinRoom {
  username: string;
  room: string;
}

const server = app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

const io = require('socket.io')(server);
const botName = 'ChatBot';
// io.use((socket, next) => {
//   const token = socket.handshake.query.token;
// })

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }: IJoinRoom) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    // WELCOME CURRENT USER
    socket.emit('message', formatMessage(botName, 'Welcome to chat!'))

    // BROADCAST WHEN A USER CONNECTS
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))

    // SEND USERS AND ROOM INFO
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })


  //RUNS WHEN CLIENT DISCONNECTS
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })

  //LISTEN FOR CHAT MESSAGE
  socket.on('chatMessage', (msg: string) => {
    const user = getCurrentUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    }
  })
})
