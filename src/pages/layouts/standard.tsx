import { Box, Container } from '@mui/material';
import ResponsiveAppBar from '@/src/components/organisms/appbar';
import Footer from '@/src/components/organisms/footer';

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
