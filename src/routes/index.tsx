
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useDrawerContext } from "../shared/contexts";
import { Visualizar } from '../pages/pessoas/Visualizar';
import {
  Dashboard,
  DetalheDePessoas,
  ListagemDePessoas,

} from "../pages";


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Dashboard",
      },

      {
        icon: "people",
        path: "/pessoas",
        label: "O.S Finalizada",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      <Route path="/pessoas/visualizar/:id" element={<Visualizar />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
