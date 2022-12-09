import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html prefix="og: http://ogp.me/ns#" lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
