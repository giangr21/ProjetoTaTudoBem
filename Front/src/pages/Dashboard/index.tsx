import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const optionsSelect = [
    { id: 'node', value: 'node', label: 'Node' },
    { id: 'react', value: 'react', label: 'ReactJS' },
  ];

  const handleSubmit = useCallback(
    async (data: any) => {
      console.log(data);
      history.push(`/chat?username=${data.username}&room=${data.room}`);
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <h1 style={{ marginBottom: 50 }}>Seja Bem Vindo</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            className="t"
            name="username"
            icon={FiUser}
            required
            placeholder="Escolha um nome de usuario"
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
      </Content>
    </Container>
  );
};

export default Dashboard;
