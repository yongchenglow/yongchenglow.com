import {
  Box,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Footer from "./components/footer";
import ResponsiveAppBar from "./components/appbar";
import theme from "../src/theme";
import Link from "next/link";

const About = () => {
  return (
    <Box height="100vh" marginTop={8} display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box py={3} textAlign="center">
          <Box mb={1}>
            <Typography variant="h4">Blog</Typography>
          </Box>
          <Box maxWidth={theme.spacing(80)} mx="auto" mb={3}>
            Welcome to my blog! Here, you will find interesting Articles are
            that I have written and hopefully they do make an impact and learn
            something useful!
          </Box>
          <Box display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 350, marginX: 1 }}>
              <CardContent>
                <Typography variant="h6" mb={1}>
                  Journey to the Web
                </Typography>
                <Typography variant="body1">
                  I have just finished my bootcamp, got my computer science
                  degree or build my first full stack web application, what's
                  next for me and where do I go from here?
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
                <Link href="/blog/1">
                  <a style={{ textDecoration: "none" }}>
                    <Button size="small">Read Now</Button>
                  </a>
                </Link>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 350, marginX: 1 }}>
              <CardContent>
                <Typography variant="h6" mb={1}>
                  Time to join the scrum!
                </Typography>
                <Typography variant="body1">
                  How does a software engineering team typically operate and
                  what are the different rituals that they do in a typical
                  sprint? Who should a team consist of?
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
                <Link href="/blog/2">
                  <a style={{ textDecoration: "none" }}>
                    <Button size="small">Read Now</Button>
                  </a>
                </Link>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
