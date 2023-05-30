import { useEffect, useMemo, useState } from "react";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import React from "react";
import {
  IListagemPessoa,
  PessoasService,
} from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);


  return (
    <LayoutBaseDePagina
      titulo="Ordem de Serviço"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
      
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={10}>Ações</TableCell>
              <TableCell width={10}>Prestadora de Serviço</TableCell>
              <TableCell width={10}>Email</TableCell>
              <TableCell width={100}> Nº O.S </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Tooltip title="Visualizar" placement="top" arrow>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/pdf/${row.id}`)}
                    >
                      <Icon>visibility</Icon>
                    
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar" placement="top" arrow>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}
                    >
                      <Icon>editar</Icon>
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell> {row.id} </TableCell>

              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
