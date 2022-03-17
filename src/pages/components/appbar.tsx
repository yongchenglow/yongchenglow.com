import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';

const pages = ['Home', 'About', 'Blog'];

const ResponsiveAppBar = () => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            justifyContent="center"
            sx={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            {pages.map((page) => (
              <Link
                key={page}
                href={page === 'Home' ? '/' : '/' + page.toLowerCase()}
              >
                <a style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: 'white',
                      display: 'block',
                      textTransform: 'unset',
                    }}
                  >
                    {page}
                  </Button>
                </a>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
