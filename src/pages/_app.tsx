import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/src/theme';
import AppScript from './_scripts';
import AppHead from './_head';
import { NextPage } from 'next';
import { primaryFont } from '../font';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AppHead />
      <ThemeProvider theme={theme}>
        <AppScript />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main className={primaryFont.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
