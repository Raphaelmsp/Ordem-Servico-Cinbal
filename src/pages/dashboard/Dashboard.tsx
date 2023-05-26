
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {

  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);

  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {

    setIsLoadingPessoas(true);

    CidadesService.getAll(1).then((result) => {


      if (result instanceof Error) {
        alert(result.message);
      } else {
        // setTotalCountCidades(result.totalCount);
      }
    });
    PessoasService.getAll(1).then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Dashboard O.S"
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de o.s finalizadas
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPessoas && (
                      <Typography variant="h1">{totalCountPessoas}</Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Box
              padding={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
            </Box>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
