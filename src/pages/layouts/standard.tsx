import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ResponsiveAppBar from '@/src/components/organisms/appbar';
import Footer from '@/src/components/organisms/footer';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const StandardLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Box height="100vh" paddingTop={8} display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </Box>
  );
};

export default StandardLayout;
