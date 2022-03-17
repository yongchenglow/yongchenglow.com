import { Box, Container } from '@mui/material';
import ResponsiveAppBar from '@/src/components/organisms/appbar';
import Footer from '@/src/components/organisms/footer';

const StandardLayout: React.FunctionComponent = ({ children }) => {
  return (
    <Box height="100vh" paddingTop={8} display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </Box>
  );
};

export default StandardLayout;
