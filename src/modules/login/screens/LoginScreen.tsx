import { useState } from 'react';

import Button from '../../../shared/components/buttons/button/button';
import SVGLogo from '../../../shared/components/icons/SVGLogo';
import Input from '../../../shared/components/input/input';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequests } from '../../../shared/hooks/useRequets';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  TitleLogin,
} from '../styles/loginScreen.styles';
import { UserType } from '../types/UserType';

const LoginScreen = () => {
  const { accessToken, setAccessToken } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const user = await postRequest<UserType>('http://localhost:8080/auth', {
      email: email,
      password: password,
    });
    setAccessToken(user?.accessToken || '');
  };

  return (
    <div>
      <ContainerLoginScreen>
        <BackgroundImage src="./background.png" />
        <ContainerLogin>
          <LimitedContainer>
            <SVGLogo />
            <TitleLogin level={2}>LOGIN ({accessToken})</TitleLogin>
            <Input margin="32px 0px 0px" title="USUARIO" onChange={handleEmail} value={email} />
            <Input
              type="password"
              margin="32px 0px 0px"
              title="SENHA"
              onChange={handlePassword}
              value={password}
            />
            <Button
              loading={loading}
              type="primary"
              margin="64px 0px 16px 0px"
              onClick={handleLogin}
            >
              ENTRAR
            </Button>
          </LimitedContainer>
        </ContainerLogin>
      </ContainerLoginScreen>
    </div>
  );
};

export default LoginScreen;
