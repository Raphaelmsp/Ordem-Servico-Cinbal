import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import React from "react";
import {
  IDetalhePessoa,
  PessoasService,
} from "../../shared/services/api/pessoas/PessoasService";
import { VTextField, useVForm, IVFormErrors, VForm } from "../../shared/forms";
import { AutoCompleteCidade } from "./components/AutoCompleteCidade";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  cidadeId: yup.number().required(),
  email: yup.string().required().email(),
  nomeCompleto: yup.string().required().min(3),
});

export const Visualizar: React.FC = () => {
  const { formRef, isSaveAndClose } = useVForm();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        email: "",
        nomeCompleto: "",
        cidadeId: undefined,
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados: Omit<IDetalhePessoa, "id">) => {
        setIsLoading(true);

        if (id === "nova") {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/pessoas");
              } else {
                navigate(`/pessoas/visualizar ${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/pessoas");
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };


  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova O.S" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          // aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          // aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={75}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                <VTextField
                  fullWidth
                  name="Solicitante"
                  disabled
                  label="Cinbal Incoflandres"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                <VTextField
                  fullWidth
                  name="nomeCompleto"
                  disabled
                  label="Prestadora de Serviço"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                <VTextField
                  fullWidth
                  name="email"
                  label="Email"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="Data"
                  label="Data"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={10}>
                <VTextField
                  fullWidth
                  multiline
                  rows={10}
                  name="Atividade a ser executada"
                  label="Atividade a ser executada"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={10}>
                <VTextField
                  fullWidth
                  multiline
                  rows={6}
                  name="Executantes"
                  label="Executantes"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={10}>
                <VTextField
                  fullWidth
                  multiline
                  rows={6}
                  name="Descrição detalhada do serviço executado"
                  label="Descrição detalhada do serviço executado"
                  disabled
                />
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>

  );
};
