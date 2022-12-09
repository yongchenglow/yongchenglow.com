import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const theme = useTheme();
  return (
    <footer style={{ marginTop: 'auto' }}>
      <Box bgcolor="text.secondary" color="white" p={1} pt={1.5}>
        <Container maxWidth="xl">
          <Grid container textAlign="center">
            <Grid item xs={12} sm={4}>
              <MuiLink
                href="https://www.linkedin.com/in/yong-cheng-low/"
                target="_blank"
                underline="none"
                color="white"
                aria-label="Linkedin"
                mx={1}
              >
                <LinkedInIcon />
              </MuiLink>
              <MuiLink
                href="https://github.com/yongchenglow"
                target="_blank"
                underline="none"
                color="white"
                aria-label="Github"
                mx={1}
              >
                <GitHubIcon />
              </MuiLink>
              <MuiLink
                href="https://www.instagram.com/yclow88/"
                target="_blank"
                underline="none"
                color="white"
                aria-label="Instagram"
                mx={1}
              >
                <InstagramIcon />
              </MuiLink>
            </Grid>
            <Grid item xs={12} sm={4}>
              © 2022 Yong Cheng Low
            </Grid>
            <Grid item xs={12} sm={4}>
              <MuiLink
                href="mailto:lowyongcheng@hotmail.com"
                underline="none"
                color="white"
              >
                <EmailIcon sx={{ marginBottom: theme.spacing(-0.75) }} />{' '}
                lowyongcheng@hotmail.com
              </MuiLink>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
