import app from './app';
import { formatMessage } from './utils/messages';

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
    console.log(username, room);
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    // WELCOME CURRENT USER
    socket.emit('message', formatMessage(botName, 'Welcome to chat!'))

    // BROADCAST WHEN A USER CONNECTS
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
  })


  //RUNS WHEN CLIENT DISCONNECTS
  socket.on('disconnect', () => {
    io.emit('message',formatMessage(botName, 'A user has left the chat'))
  })

  //LISTEN FOR CHAT MESSAGE
  socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg));
  })
})
