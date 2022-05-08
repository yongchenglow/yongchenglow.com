import {
  Box,
  Avatar,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import { ViewerDocument } from '@/lib/viewer.graphql';
import { initializeApollo } from '@/lib/apollo';
import Link from 'next/link';
import StandardLayout from '@/src/pages/layouts/standard';

const Index = () => {
  // const theme = useTheme();
  return (
    <StandardLayout>
      <Grid container spacing={2} maxWidth="md" marginX="auto" marginY={3}>
        <Grid item xs={5}>
          <Avatar
            alt="Low Yong Cheng"
            src="/img/yong-cheng-badminton.jpg"
            variant="rounded"
            sx={{
              width: '100%',
              height: 'auto',
              marginX: 'auto',
            }}
          />
        </Grid>
        <Grid item xs={7} display="flex" alignItems="center">
          <Box ml={5}>
            <Typography variant="h4" mb={1}>
              Hello everyone!
            </Typography>
            <Typography variant="h5">
              I am Yong Cheng or YC for short. I am a Web Software Engineer at{' '}
              <MuiLink
                href="https://glints.com"
                target="_blank"
                underline="none"
              >
                Glints
              </MuiLink>
              , part-time teacher at{' '}
              <MuiLink
                href="https://www.lewagon.com/singapore"
                target="_blank"
                underline="none"
              >
                Le Wagon
              </MuiLink>{' '}
              and a Sports Enthusiast.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box py={3} textAlign="center">
        <Box mb={2}>
          <Typography variant="h4">Lastest Tech Article</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Card sx={{ maxWidth: 350, marginX: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Setting up your Project
              </Typography>
              <Typography variant="body1">
                What is the proper way to setup a group project? How do we make
                the best our of our IDE to increase code quality and
                productivity?
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
              <Link href="/blog/6">
                <a style={{ textDecoration: 'none' }}>
                  <Button size="small">Read Now</Button>
                </a>
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Box>

      <Box py={3} textAlign="center">
        <Box mb={2}>
          <Typography variant="h4">Project highlights</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Card sx={{ maxWidth: 350, marginX: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                NUS Students&apos; Sports Club
              </Typography>
              <Typography variant="body1">
                I coded a website for them display the information about the
                club. This includes Member Clubs, Sports Club Projects and the
                Management Committee. Pardon me if the code is very low quality
                as this was my first big project using React.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
              <MuiLink
                href="https://www.nussportsclub.org"
                target="_blank"
                underline="none"
              >
                <Button size="small" variant="outlined">
                  Website
                </Button>
              </MuiLink>
              <MuiLink
                href="https://github.com/yongchenglow/nus-students-sports-club"
                target="_blank"
                underline="none"
              >
                <Button size="small" variant="outlined">
                  Code
                </Button>
              </MuiLink>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 350, marginX: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                My Personal Website
              </Typography>
              <Typography variant="body1">
                Checkout the code to this website. It is done using NextJS as
                expect it to change a lot over time. It is still very primitive
                as most of the items are hard coded. It is deployed through my
                own personal webserver on a RaspberryPi3.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
              <MuiLink
                href="https://github.com/yongchenglow/yongchenglow.com"
                target="_blank"
                underline="none"
              >
                <Button size="small" variant="outlined">
                  Code
                </Button>
              </MuiLink>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 350, marginX: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                AirBnB Clone
              </Typography>
              <Typography variant="body1">
                This is a project done using Ruby on Rails, mainly for students
                in Le Wagon students to see my twist on it. The code is still a
                work in progress. However, do take note of the different
                features that it include e.g. CI/CD, Commit Linting etc.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
              <MuiLink
                href="https://airbnb-yongchenglow.herokuapp.com/"
                target="_blank"
                underline="none"
              >
                <Button size="small" variant="outlined">
                  Website
                </Button>
              </MuiLink>
              <MuiLink
                href="https://github.com/yongchenglow/airbnb-clone"
                target="_blank"
                underline="none"
              >
                <Button size="small" variant="outlined">
                  Code
                </Button>
              </MuiLink>
            </CardActions>
          </Card>
        </Box>
      </Box>

      <Box py={3} textAlign="center">
        <Box mb={1}>
          <Typography variant="h4">Who am I?</Typography>
        </Box>
        <Grid container spacing={2} maxWidth="md" marginX="auto" marginY={3}>
          <Grid item xs={5}>
            <Avatar
              alt="Low Yong Cheng"
              src="/img/yong-cheng-metasprint.jpeg"
              variant="rounded"
              sx={{
                width: '100%',
                height: 'auto',
                marginX: 'auto',
              }}
            />
          </Grid>
          <Grid item xs={7} display="flex" alignItems="center">
            <Box ml={5} textAlign="left">
              <Typography marginBottom={2} variant="body1">
                Hello! Thank you for visiting my website.
              </Typography>
              <Typography marginBottom={2} variant="body1">
                Once again, I am Yong Cheng or YC, I grew up studying in various
                international schools in particular{' '}
                <MuiLink
                  href="https://www.scis-china.org"
                  target="_blank"
                  underline="none"
                >
                  Shanghai Community International School
                </MuiLink>
                ,{' '}
                <MuiLink
                  href="https://shanghai-pudong.dulwich.org"
                  target="_blank"
                  underline="none"
                >
                  Dulwich College Shanghai
                </MuiLink>{' '}
                and{' '}
                <MuiLink
                  href="https://shatincollege.edu.hk"
                  target="_blank"
                  underline="none"
                >
                  Sha Tin College Hong Kong
                </MuiLink>
                .
              </Typography>
              <Typography marginBottom={2} variant="body1">
                During my free time, I will write Tech Articles to share my
                experience as a web software engineer. I hope that these
                articles will help students transition into the Software
                Engineering careers. The particular targeted audiences are for
                fresh graduates or students who just completed a coding bootcamp
                and want to transition into a full-time software engineering
                role.
              </Typography>
              <Typography marginBottom={2} variant="body1">
                You can find out more about me in the{' '}
                <Link href="/about">
                  <a style={{ textDecoration: 'none' }}>about</a>
                </Link>{' '}
                section.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StandardLayout>
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
