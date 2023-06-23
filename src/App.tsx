import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./shared/forms/TraducoesYup";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";

import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts/AuthContext";
import {Login} from "./shared/components/login/Login";

export const App = () => {
  return (

    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
