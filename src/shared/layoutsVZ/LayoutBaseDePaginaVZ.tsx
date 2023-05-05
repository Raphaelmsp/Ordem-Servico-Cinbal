import { ReactNode } from 'react';
import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaVZProps {
  titulo: string;
  children: ReactNode;
  barraDeFerramentas?: ReactNode;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaVZProps> = ({
  children,
  titulo,

}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='130%' display='flex' flexDirection='column' gap={1}>
      <Box
        padding={1}
        display='flex'
        alignItems='center'
        gap={0}

      >

        <Typography
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipses'
          variant={smDown ? 'h5' : mdDown ? 'h5' : 'h5'}
        >
          {titulo}
        </Typography>
      </Box>



      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};
