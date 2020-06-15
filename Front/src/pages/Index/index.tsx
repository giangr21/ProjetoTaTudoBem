import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FiUser, FiLogIn, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content } from './styles';
import { useAuth } from '../../hooks/Auth';

interface SignUpFormData {
  email: string;
  senha: string;
}

const Index: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async ({ email, senha }: SignUpFormData) => {
      try {
        await signIn({
          email,
          senha,
        });
        history.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
    [history, signIn],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: 30 }}>Login</h1>
          <Input
            required
            name="email"
            icon={FiUser}
            type="email"
            placeholder="exemplo@email.com"
          />
          <Input
            required
            name="senha"
            icon={FiLock}
            type="password"
            placeholder="*************"
          />

          <Button type="submit">Acessar</Button>
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
  );
};

export default Index;
