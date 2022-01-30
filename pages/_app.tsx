import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
        <meta
          name="og:image"
          content="https://kalamchi.site/android-chrome-512x512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@__masood_" />
        <meta name="twitter:creator" content="@__masood_" />
        <meta name="twitter:title" content="کلمچی | بازی حدس کلمه" />
        <meta name="twitter:description" content="یک Wordle فارسی دیگه!" />
        <meta
          name="twitter:image"
          content="https://kalamchi.site/android-chrome-512x512.png"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
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
