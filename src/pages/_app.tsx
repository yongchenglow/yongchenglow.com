import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/src/theme';
import AppScript from './_scripts';
import AppHead from './_head';
import { NextPage } from 'next';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
});

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AppHead />
      <ThemeProvider theme={theme}>
        <AppScript />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
