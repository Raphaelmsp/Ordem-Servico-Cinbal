import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress } from "@mui/material";
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

export const DetalheDePessoas: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
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
                navigate(`/pessoas/detalhe/${result}`);
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

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova O.S" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"

        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid container item direction="row" spacing={75}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                <VTextField
                  variant='standard'
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
                  variant='standard'
                  fullWidth
                  name="nomeCompleto"
                  disabled={isLoading}
                  label="Prestadora de Serviço"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={5}>
                <VTextField
                  variant='standard'
                  fullWidth
                  name="email"
                  label="Email"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  variant='standard'
                  fullWidth
                  name="Data"
                  label="Data"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    variant='standard'
                    fullWidth
                    name="Contato"
                    label="Contato"
                    disabled={isLoading}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <AutoCompleteCidade isExternalLoading={isLoading} />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={10}>
                  <VTextField
                    variant='standard'
                    fullWidth
                    multiline
                    rows={10}
                    name="Atividade a ser executada"
                    label="Atividade a ser executada"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={10}>
                  <VTextField
                    variant='standard'
                    fullWidth
                    multiline
                    rows={6}
                    name="Executantes"
                    label="Executantes"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={10}>
                  <VTextField
                    variant='standard'
                    fullWidth
                    multiline
                    rows={6}
                    name="Descrição detalhada do serviço executado"
                    label="Descrição detalhada do serviço executado"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
