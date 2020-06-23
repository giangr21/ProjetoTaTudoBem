/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Row, Video, Header } from './styles';

const WebVideo: React.FC = () => {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  const userVideo: any = useRef();
  const partnerVideo: any = useRef();
  const history = useHistory();

  useEffect(() => {
    setSocket(io('http://localhost:3333'));
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((str: any) => {
        setStream(str);
        if (userVideo.current) {
          userVideo.current.srcObject = str;
        }
      });

    socket?.on('yourID', (id: string) => {
      setYourID(id);
    });

    socket?.on('allUsers', (usrs: string) => {
      console.log(usrs);
      setUsers(usrs);
    });

    socket?.on('hey', (data: any) => {
      console.log(data);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, [socket]);

  function callPeer(id: any) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
          {
            urls: 'turn:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
        ],
      },
      stream,
    });

    peer.on('signal', (data: any) => {
      socket?.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on('stream', (str: any) => {
      console.log(str);
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket?.on('callAccepted', (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on('signal', (data: any) => {
      socket?.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', (str: any) => {
      partnerVideo.current.srcObject = str;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline muted ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} está te ligando</h1>
        <button type="button" onClick={acceptCall}>
          Deseja Aceitar ?
        </button>
      </div>
    );
  }

  function goBack() {
    return history.push('/');
  }

  return (
    <>
      <Header>
        <button className="button" onClick={goBack} type="button">
          <FiPower />
        </button>
      </Header>
      <Container>
        <Row>
          {UserVideo}
          {PartnerVideo}
        </Row>
        <Row>
          {Object.keys(users).map((key) => {
            if (key === yourID) {
              return null;
            }
            return (
              <button type="button" onClick={() => callPeer(key)}>
                Call {key}
              </button>
            );
          })}
        </Row>
        {!callAccepted && <Row>{incomingCall}</Row>}
      </Container>
    </>
  );
};

export default WebVideo;
