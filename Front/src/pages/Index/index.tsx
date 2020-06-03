import React, { useRef, useCallback } from 'react';
import { Container, Content } from './styles'
import { Form } from '@unform/web';
import Input from '../../components/Input'
import Button from '../../components/Button'
import { FiUser, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import api from '../../services/api';

interface SignUpFormData {
  email: string;
  senha: string;
}

const Index: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async ({email, senha}: SignUpFormData) => {
      try {
        const response = await api.post('sessions', {
          email,
          senha
        });
        const { token, user } = response.data;
        console.log(token, user);
        history.push('/chat');

      } catch (err) {
      }
    },
    [history],
  );


  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: 30 }}>Login</h1>
          <Input
            name="email"
            icon={FiUser}
            type="email"
            placeholder="exemplo@email.com"
          />
          <Input
            name="senha"
            icon={FiUser}
            type="password"
            placeholder="*************"
          />

          <Button type="submit">
            Acessar
				</Button>
        </Form>
        <Link to="/signup-user">
          <FiLogIn />
            Criar Conta Usuario
          </Link>
        <Link to="/signup-volun">
          <FiLogIn />
            Criar Conta Voluntario
          </Link>
      </Content>
    </Container>
  )
};

export default Index;
