import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import React from "react";
import { useAppThemeContext, useAuthContext } from "../../contexts";

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

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { toggleTheme } = useAppThemeContext();
  // const { logout } = useAuthContext();

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <>
      <Box
        display="flex"
        left="95%"
        width="20px"
        height="20px"
        position="relative"
      >
        <List component="nav">
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
      <Box width="100vw" height="100vh"display="flex" alignItems="center" justifyContent="center">
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={5} width={400}>
              <Typography variant="h6" align="center">
                <img
                  src="https://media.glassdoor.com/sqll/2491087/cinbal-squarelogo-1554782944622.png"
                  width="10%"
                />
                <br></br>
                Identifique-se
              </Typography>

              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={() => setEmailError("")}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Senha"
                type="password"
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={() => setPasswordError("")}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit}
                endIcon={
                  isLoading ? (
                    <CircularProgress
                      variant="indeterminate"
                      color="inherit"
                      size={20}
                    />
                  ) : undefined
                }
              >
                Entrar
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
