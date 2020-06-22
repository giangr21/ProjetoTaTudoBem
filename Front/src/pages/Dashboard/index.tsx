import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { FiUser, FiPower } from 'react-icons/fi';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Container, Content, Header } from './styles';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, signOut } = useAuth();
  const history = useHistory();
  const optionsSelect = [
    { id: 'batepapo', value: 'batepapo', label: 'Bate-Papo' },
    { id: 'ajuda', value: 'ajuda', label: 'Ajuda' },
  ];

  const handleSubmitChat = useCallback(
    async (data: any) => {
      console.log(data);
      history.push(`/chat?username=${data.username}&room=${data.room}`);
    },
    [history],
  );
  const handleSubmitVideo = useCallback(
    async (data: any) => {
      history.push(`/webvideo`);
    },
    [history],
  );

  return (
    <>
    <Header>
    <button className="button" onClick={signOut} type="button">
      <FiPower />
    </button>

    </Header>
    <Container>
      <Content>
        <h1 style={{ marginBottom: 50 }}>Seja Bem Vindo {user.nome}</h1>
        <div className="flex">
          <Form className="m5" ref={formRef} onSubmit={handleSubmitChat}>
            <Input
              name="username"
              icon={FiUser}
              required
              placeholder="Escolha um nome de usuario para o chat"
            />
            <Select
              placeholder="Selecione uma sala"
              name="room"
              options={optionsSelect}
            />
            <button type="submit" className="btn">
              Entrar no chat
          </button>
          </Form>
          <Form className="m5" ref={formRef} onSubmit={handleSubmitVideo}>
            <button type="submit" className="btn">
              Entrar no webVideo
          </button>
          </Form>
        </div>
      </Content>
    </Container>
    </>
  );
};

export default Dashboard;
