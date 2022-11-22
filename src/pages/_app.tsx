import { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/src/theme';
import AppScript from './_scripts';
import AppHead from './_head';
import { NextPage } from 'next';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AppHead />
      <ThemeProvider theme={theme}>
        <AppScript />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
