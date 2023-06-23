import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import React from 'react';
import { AppContainer } from './styles';
import { useState } from 'react';
import {
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts';




const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});
interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: true })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(true);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (

  // const MyComponent: React.FC = () => {
  //   return (
  //     <div className="container">
  //       <div className="forms-container">
  //         <div className="signin-signup">
  //           <form action="#" className="sign-in-form">
  //             <h2 className="title">Entrar</h2>
  //             <div className="input-field">
  //               <i className="fas fa-user"></i>
  //               <input type="text" placeholder="Nome do usuário" />
  //             </div>
  //             <div className="input-field">
  //               <i className="fas fa-lock"></i>
  //               <input type="password" placeholder="Senha" />
  //             </div>
  //             <input type="submit" value="Login" className="btn solid" />
  //             <p className="social-text">Ou entre com plataformas sociais</p>
  //             <div className="social-media">
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-facebook-f"></i>
  //               </a>
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-twitter"></i>
  //               </a>
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-google"></i>
  //               </a>
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-linkedin-in"></i>
  //               </a>
  //             </div>
  //           </form>
  //           <form action="#" className="sign-up-form">
  //             <h2 className="title">INSCREVA-SE</h2>
  //             <div className="input-field">
  //               <i className="fas fa-user"></i>
  //               <input type="text" placeholder="Username" />
  //             </div>
  //             <div className="input-field">
  //               <i className="fas fa-envelope"></i>
  //               <input type="email" placeholder="Email" />
  //             </div>
  //             <div className="input-field">
  //               <i className="fas fa-lock"></i>
  //               <input type="password" placeholder="Password" />
  //             </div>
  //             <input type="submit" className="btn" value="Sign up" />
  //             <p className="social-text">Ou inscreva-se nas plataformas sociais</p>
  //             <div className="social-media">
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-facebook-f"></i>
  //               </a>
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-twitter"></i>
  //               </a>
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-google"></i>
  //               </a>
  //               <a href="#" className="social-icon">
  //                 <i className="fab fa-linkedin-in"></i>
  //               </a>
  //             </div>
  //           </form>
  //         </div>
  //       </div>

  //       <div className="panels-container">
  //         <div className="panel left-panel">
  //           <div className="content">
  //             <h3>Bem-vindo à sua Incoflandres!</h3>
  //             <p>
  //               “A única maneira de alcançar o <br />
  //               impossível é acreditar que é possível.”
  //               <br />– Charles Kingsleigh
  //             </p>
  //             <button className="btn transparent" id="sign-up-btn">
  //               INSCREVA-SE
  //             </button>
  //           </div>
  //           <img src="https://link.incoflandres.com.br/assets/svg/206f7a33.svg" className="image" alt="" />
  //         </div>
  //         <div className="
    <AppContainer>
      <Box
        position="absolute"
        display='flex'
        flexDirection='column'
        gap={5}
        width={1000}
        left="-50px"
      >
        <div className="panel left-panel">
          <div className="content">
            <h3>Bem-vindo à sua Incoflandres!</h3>
            <p>
              “A única maneira de alcançar o <br />
              impossível é acreditar que é possível.”
              <br />– Charles Kingsleigh
            </p>
          </div>
          <img

            src={"https://link.incoflandres.com.br/assets/svg/206f7a33.svg"}
            className="image"
            height={388}
            width={562}
            alt=""
          />
        </div>

      </Box>

      <>

        <Box>
          <Card variant='outlined' sx={{ border: 'none' }} >
            <CardContent>
              <Box
                display='flex'
                flexDirection='column'
                gap={5}
                width={400}
                zIndex='2'

                height='300px'

              >
                <Typography variant='h6' align='center'>
                  <img
                    src="logo2.svg" alt="" />

                  Identifique-se
                </Typography>

                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  value={email}
                  disabled={isLoading}
                  error={!!emailError}
                  helperText={emailError}
                  onKeyDown={() => setEmailError('')}
                  onChange={(e) => setEmail(e.target.value)} />

                <TextField
                  fullWidth
                  label='Senha'
                  type='password'
                  value={password}
                  disabled={isLoading}
                  error={!!passwordError}
                  helperText={passwordError}
                  onKeyDown={() => setPasswordError('')}
                  onChange={(e) => setPassword(e.target.value)} />
              </Box>
            </CardContent>

            <CardActions>
              <Box width='100%' display='flex' justifyContent='center'>
                <Button
                  variant='contained'
                  disabled={isLoading}
                  onClick={handleSubmit}
                  endIcon={isLoading ? (
                    <CircularProgress
                      variant='indeterminate'
                      color='inherit'
                      size={20} />
                  ) : undefined}
                >
                  Entrar
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </>
    </AppContainer>
  );
};
