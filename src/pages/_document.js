import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body
        style={{
          lineHeight: "1.5",
          color: "rgba(255, 255, 255, 0.92)",
          backgroundColor: "rgb(26, 32, 44)",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
