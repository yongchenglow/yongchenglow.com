import { Box, Container, Typography } from "@mui/material";
import Footer from "../components/footer";
import ResponsiveAppBar from "../components/appbar";

const About = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box py={3} textAlign="center">
          <Box mb={1}>
            <Typography variant="h4">Time to join the scrum!</Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
