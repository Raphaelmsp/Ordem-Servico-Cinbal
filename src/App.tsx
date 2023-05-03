import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./shared/forms/TraducoesYup";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { Login, MenuLateral } from "./shared/components";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts/AuthContext";

export const App = () => {
  return (

    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
