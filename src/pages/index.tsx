import Link from 'next/link';
import StandardLayout from '@/src/pages/layouts/standard';
import GoogleAds from '@/src/components/atoms/googleAds';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Link as MuiLink,
  CardContent,
  Card,
  CardActions,
  Button,
} from '@mui/material';

const Index = () => {
  return (
    <StandardLayout>
      <Box display="flex" justifyContent="center">
        <Grid
          container
          columnSpacing={{ xs: 0, sm: 2 }}
          maxWidth="md"
          marginY={3}
          justifyContent="center"
        >
          <Grid size={{ xs: 8, sm: 5 }}>
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
          <Grid
            size={{ xs: 12, sm: 7 }}
            mt={2}
            display="flex"
            alignItems="center"
          >
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }} mx={2}>
              <Typography variant="h4" mb={1}>
                Hello everyone!
              </Typography>
              <Typography variant="h5" mb={1}>
                I am Yong Cheng or YC for short.
              </Typography>
              <Typography variant="h5">
                I am a Web Software Engineer at{' '}
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
      </Box>

      <Box py={3} textAlign="center">
        <Box mb={2}>
          <Typography variant="h4">Latest Tech Articles</Typography>
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
              <Link href="/blog/6" style={{ textDecoration: 'none' }}>
                <Button size="small">Read Now</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Box>

      <Box py={3} textAlign="center">
        <Box mb={2}>
          <Typography variant="h4">Project highlights</Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid size={{ sm: 12, md: 4, lg: 3 }}>
            <Card sx={{ maxWidth: 350, marginY: 3, marginX: 'auto' }}>
              <CardContent>
                <Typography variant="h6" mb={1}>
                  NUS Students&apos; Sports Club
                </Typography>
                <Typography variant="body1">
                  I developed a company website for the club. This was my first
                  project using react.
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
          </Grid>
          <Grid size={{ sm: 12, md: 4, lg: 3 }}>
            <Card sx={{ maxWidth: 350, marginY: 3, marginX: 'auto' }}>
              <CardContent>
                <Typography variant="h6" mb={1}>
                  My Personal Website
                </Typography>
                <Typography variant="body1">
                  Coded using NextJS and deployed through my own personal
                  webserver on a RaspberryPi3.
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
          </Grid>
          <Grid size={{ sm: 12, md: 4, lg: 3 }}>
            <Card sx={{ maxWidth: 350, marginY: 3, marginX: 'auto' }}>
              <CardContent>
                <Typography variant="h6" mb={1}>
                  AirBnB Clone
                </Typography>
                <Typography variant="body1">
                  This is a project done using Ruby on Rails, mainly for
                  students in Le Wagon students to see my twist on it.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
                <MuiLink
                  href="https://airbnb-yc.herokuapp.com"
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
          </Grid>
        </Grid>
      </Box>

      <GoogleAds slotId="5500217699" />

      <Box py={3} textAlign="center">
        <Box mb={1}>
          <Typography variant="h4">Who am I?</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Grid
            container
            columnSpacing={{ xs: 0, sm: 2 }}
            maxWidth="md"
            marginY={3}
            justifyContent="center"
          >
            <Grid size={{ xs: 8, sm: 5 }} mb={3}>
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
            <Grid size={{ xs: 12, sm: 7 }} display="flex" alignItems="center">
              <Box textAlign="left" mx={2}>
                <Typography marginBottom={2} variant="body1">
                  I am Yong Cheng or YC, I grew up studying in various
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
                  learning experience as a web software engineer. I hope that
                  these articles will help my students and others transition
                  into the Software Engineering careers. These articles are
                  mainly targeted at junior web software engineers. If you are a
                  mid or senior level, feel free to take a peek at them if you
                  are free.
                </Typography>
                <Typography marginBottom={2} variant="body1">
                  You can find out more about me in the{' '}
                  <Link href="/about" style={{ textDecoration: 'none' }}>
                    about
                  </Link>{' '}
                  section.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <GoogleAds slotId="8155985403" />
    </StandardLayout>
  );
};

export default Index;
