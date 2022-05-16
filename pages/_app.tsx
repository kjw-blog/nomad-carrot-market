import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import useUser from '@libs/client/useUser';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.className = 'scrollbar-hide';
  });

  const { user } = useUser();

  return (
    <SWRConfig
      value={{
        // refreshInterval: 2000  설정 시간마다 fetch를 다시 해준다.
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;

/**
 * SWRConfig에 value를 지정해줌으로써 모든 useSWR에 fetcher를 기본값으로 정해준다.
 * useSWR에는 url 만 넘겨주면됨 !
 */
