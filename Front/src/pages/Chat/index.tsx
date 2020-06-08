import React, { useRef, useCallback, useEffect, useState } from 'react'
import './style.css'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FiUser } from 'react-icons/fi';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<any>>([])
  const formRef = useRef<FormHandles>(null);
  const chatRef: any = useRef(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const location = useLocation()

  useEffect(() => {
    setSocket(io('http://localhost:3333'));
  }, [])

  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const username = UrlParams.get('username')
    const room = UrlParams.get('room');

    socket?.emit('joinRoom', { username, room })

    socket?.on('roomUsers', ({ room, users }: any) => {
      // output
    })
  }, [location.search, socket])

  useEffect(() => {
    socket?.on('message', (message: any) => {
      console.log(message);
      addMessages(message)
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    })
  })

  const handleSubmit = useCallback(
    (data: any, { reset }) => {
      socket?.emit('chatMessage', data.msg)
      reset()
    },
    [socket],
  );

  const addMessages = useCallback((message: any) => {
    setMessages([...messages, message])
    console.log(messages);
    },[]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> ChatCord</h1>
        <a href="index.html" className="btn">Leave Room</a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name">JavaScript</h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul id="users">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
          </ul>
        </div>
        <div ref={chatRef} className="chat-messages">
          <div className="message">
            <p className="meta">Brad <span>9:12pm</span></p>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
						</p>
          </div>
          <div className="message">
            <p className="meta">Mary <span>9:15pm</span></p>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
						</p>
          </div>
        </div>
      </main>
      <div className="chat-form-container">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            className="t"
            name="msg"
            icon={FiUser}
            placeholder="exemplo@email.com"
          />
          <Button className="btn" type="submit">
            Enviar
				</Button>
        </Form>
      </div>
    </div>
  );
}

export default Chat;
