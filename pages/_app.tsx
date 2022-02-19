import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.className = 'scrollbar-hide';
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
