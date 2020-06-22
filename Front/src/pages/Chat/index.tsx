/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback, useEffect, useState } from 'react';
import './style.css';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiUser } from 'react-icons/fi';
import io from 'socket.io-client';
import { useLocation, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface Imsg {
  text: string;
  time: string;
  username: string;
}

interface Iusers {
  id: string;
  username: string;
  room: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Imsg[]>([]);
  const [msg, setMsg] = useState<Array<Imsg>>([]);
  const [users, setUsers] = useState<Array<Iusers>>([]);
  const formRef = useRef<FormHandles>(null);
  const chatRef: any = useRef(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [roomName, setRoomName] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    setSocket(io('http://localhost:3333'));
  }, []);

  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const username = UrlParams.get('username');
    const room = UrlParams.get('room');
    socket?.emit('joinRoom', { username, room });

    socket?.on('roomUsers', (data: any) => {
      setRoomName(data.r);
      setUsers(data.users);
    });
  }, [location.search, socket]);

  const addMessages = useCallback(
    (message: Imsg) => {
      messages.push(message);
      setMsg([...messages]);
    },
    [messages, msg],
  );

  const handleSubmit = useCallback(
    (data: any, { reset }) => {
      socket?.emit('chatMessage', data.msg);
      reset();
    },
    [socket],
  );

  useEffect(() => {
    socket?.on('message', (message: Imsg) => {
      addMessages(message);
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });
  }, [socket]);

  return (
    <div style={{ height: '100vh' }}>
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile" /> ChatCord
          </h1>
          <Link to="/" className="btn">
            Leave Room
          </Link>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments" /> Room Name:
            </h3>
            <h2 id="room-name">{roomName}</h2>
            <h3>
              <i className="fas fa-users" /> Users
            </h3>
            <ul id="users">
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
          <div ref={chatRef} className="chat-messages">
            {messages.map((message, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="message">
                <p className="meta">
                  {message.username} <span>{message.time}</span>
                </p>
                <p className="text">{message.text}</p>
              </div>
            ))}
          </div>
        </main>
        <div className="chat-form-container">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              className="t"
              name="msg"
              icon={FiUser}
              placeholder="Digite algo"
            />
            <Button className="btn" type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
