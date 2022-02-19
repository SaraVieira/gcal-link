import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          defer
          data-domain="gcal.dotenv.dev"
          src="https://analytics.iamsaravieira.com/js/plausible.js"
        ></script>
      </body>
    </Html>
  );
}
