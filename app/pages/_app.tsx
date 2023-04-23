import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/theme.dark.css";

import SSRProvider from "react-bootstrap/SSRProvider";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRProvider>
  );
}
