import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content } from './styles';

interface SignUpFormData {
  nome: string;
  email: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        await api.post('voluntarios', data);
        history.push('/');
        toast.success('Voluntario criado com sucesso!');
      } catch (err) {
        toast.error('Erro ao criar voluntario!');
      }
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input required name="nome" icon={FiUser} placeholder="Nome" />
          <Input required name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            required
            name="senha"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Input name="profissao" icon={FiUser} placeholder="Profissao" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
