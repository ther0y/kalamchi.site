import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Head>
        <meta charSet="utf-8" />
        <title>Kalamchi | کلمچی</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="بازی حدس کلمه کلمچی یک Wordle فارسی دیگه!"
        />
        <meta name="og:url" content="https://kalamchi.site/" />
        <meta name="og:title" content="کلمچی | بازی حدس کلمه" />
        <meta
          name="og:description"
          content="بازی حدس کلمه کلمچی یک Wordle فارسی دیگه!"
        />
        <meta name="og:image" content="https://kalamchi.site/banner.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@__masood_" />
        <meta name="twitter:creator" content="@__masood_" />
        <meta name="twitter:title" content="کلمچی | بازی حدس کلمه" />
        <meta name="twitter:description" content="یک Wordle فارسی دیگه!" />
        <meta name="twitter:image" content="https://kalamchi.site/banner.jpg" />

        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "d15b2b42fc474bd1ae37f80914497113"}'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
