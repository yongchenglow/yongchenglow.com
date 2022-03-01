import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Footer from "./components/footer";
import ResponsiveAppBar from "./components/appbar";
import theme from "../src/theme";

const About = () => {
  return (
    <Box height="100vh" marginTop={8} display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box py={3} textAlign="center">
          <Box mb={1}>
            <Typography variant="h4">About Me</Typography>
          </Box>
          <Box maxWidth={theme.spacing(80)} mx="auto" mb={2}>
            For now, this section of the page is still under construction. If
            you want to find out more about me, please proceed to my LinkedIn
          </Box>
          <MuiLink
            href="https://www.linkedin.com/in/yong-cheng-low/"
            target="_blank"
          >
            <LinkedInIcon
              sx={{ color: "#0072B1", fontSize: theme.spacing(8) }}
            />
          </MuiLink>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
