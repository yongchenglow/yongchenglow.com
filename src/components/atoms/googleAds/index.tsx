import { Box, CircularProgress } from '@mui/material';
import React, { Suspense, useEffect } from 'react';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

interface Props {
  slotId: string;
}

const GoogleAds: React.FunctionComponent<Props> = ({ slotId }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Suspense fallback={<CircularProgress />}>
        <ins
          className="adsbygoogle"
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_ID}
          data-ad-slot={slotId}
        ></ins>
      </Suspense>
    </Box>
  );
};

export default GoogleAds;
