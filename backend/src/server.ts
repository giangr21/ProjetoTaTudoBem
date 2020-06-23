import app from './app';
import { formatMessage } from './utils/messages';
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from './utils/users';

interface IJoinRoom {
  username: string;
  room: string;
}

interface IJoinVideo {
  username: string;
}

const server = app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

const io = require('socket.io')(server);

const botName = 'ChatBot';
const users: any = {};
const usersName: any = [];

io.on('connection', (socket: any) => {
  socket.on('joinRoom', ({ username, room }: IJoinRoom) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // WELCOME CURRENT USER
    socket.emit('message', formatMessage(botName, 'Welcome to chat!'));

    // BROADCAST WHEN A USER CONNECTS
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`),
      );

    // SEND USERS AND ROOM INFO
    io.to(user.room).emit('roomUsers', {
      r: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // RUNS WHEN CLIENT DISCONNECTS
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`),
      );

      io.to(user.room).emit('roomUsers', {
        r: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  // LISTEN FOR CHAT MESSAGE
  socket.on('chatMessage', (msg: string) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    }
  });

  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  io.sockets.emit('allUsers', users);

  socket.emit('yourID', socket.id);

  socket.on('disconnect', () => {
    delete users[socket.id];
  });

  socket.on('callUser', (data: any) => {
    io.to(data.userToCall).emit('hey', {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on('acceptCall', (data: any) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});
