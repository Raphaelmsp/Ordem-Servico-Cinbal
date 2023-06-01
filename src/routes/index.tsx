
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useDrawerContext } from "../shared/contexts";
import {
  Dashboard,
  DetalheDePessoas,
  ListagemDePessoas,
  Pdf,
} from "../pages";
import { MenuLateral } from "../shared/components";



export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      // {
      //   icon: "home",
      //   path: "/pagina-inicial",
      //   label: "Dashboard",
      // },

      {
        icon: "people",
        path: "/pessoas",
        label: "O.S Finalizada",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/" element={<MenuLateral />}>
        <Route path="/pagina-inicial" element={<Dashboard />} />
        <Route path="/pessoas" element={<ListagemDePessoas />} />
        <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

      </Route>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="/pdf/:id" element={<Pdf />} />
    </Routes>


  );
};
