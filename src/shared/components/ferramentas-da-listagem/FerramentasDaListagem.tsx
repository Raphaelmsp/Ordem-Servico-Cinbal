import { Box, Button, Icon, List, ListItemButton, ListItemIcon, TextField, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { Environment } from "../../environment";
import { useAppThemeContext } from "../../contexts";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}
export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  aoMudarTextoDeBusca,
  mostrarInputBusca = false,
  aoClicarEmNovo,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
}) => {
  const theme = useTheme();
  const { toggleTheme } = useAppThemeContext();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={4}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}

    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Tooltip title="Tema Escuro" placement="top" arrow>
        <List component="nav">
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>
              <Icon>dark_mode</Icon>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Tooltip>
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
