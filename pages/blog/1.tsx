import {
  Box,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Footer from "../components/footer";
import ResponsiveAppBar from "../components/appbar";
import theme from "../../src/theme";

const About = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box py={3} textAlign="center">
          <Box mb={1}>
            <Typography variant="h4">Journey to the Web</Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
