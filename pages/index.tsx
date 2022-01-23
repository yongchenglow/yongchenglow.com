import { useState } from "react";
import {
  Box,
  Avatar,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Link as MuiLink,
} from "@mui/material";
import {
  ViewerQuery,
  useViewerQuery,
  useUpdateNameMutation,
  ViewerDocument,
} from "../lib/viewer.graphql";
import { initializeApollo } from "../lib/apollo";
import ResponsiveAppBar from "./components/appbar";
import Footer from "./components/footer";
import theme from "../src/theme";
import Link from "next/link";

const Index = () => {
  const { viewer } = useViewerQuery().data!;
  const [newName, setNewName] = useState("");
  const [updateNameMutation] = useUpdateNameMutation();

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      //Follow apollo suggestion to update cache
      //https://www.apollographql.com/docs/angular/features/cache-updates/#update
      update: (cache, mutationResult) => {
        const { data } = mutationResult;
        if (!data) return; // Cancel updating name in cache if no data is returned from mutation.
        // Read the data from our cache for this query.
        const { viewer } = cache.readQuery({
          query: ViewerDocument,
        }) as ViewerQuery;
        const newViewer = { ...viewer };
        // Add our comment from the mutation to the end.
        newViewer.name = data.updateName.name;
        // Write our data back to the cache.
        cache.writeQuery({
          query: ViewerDocument,
          data: { viewer: newViewer },
        });
      },
    });
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box textAlign="center" mt={2}>
          <Avatar
            alt="Low Yong Cheng"
            src="/img/YongCheng.jpg"
            sx={{
              width: theme.spacing(20),
              height: theme.spacing(20),
              marginX: "auto",
            }}
          />
          <Box mt={1}>
            <Typography variant="h4">
              Hello and welcome to my webpage!
            </Typography>
          </Box>
        </Box>

        <Box py={3} textAlign="center">
          <Box mb={2}>
            <Typography variant="h5">Check out my latest content</Typography>
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

        <Box py={3} textAlign="center">
          <Box mb={1}>
            <Typography variant="h5">Who am I?</Typography>
          </Box>
          <Box maxWidth={theme.spacing(80)} mx="auto">
            I am Yong Cheng, sometimes my friends call me YC for short. I am a
            Web Software Engineer currently working at Glints and I teach at Le
            Wagon Singapore part time. Check out some of my articles that I
            write as I try to share with others about my software engineering
            journey. You can find out more about me at my about page.
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;