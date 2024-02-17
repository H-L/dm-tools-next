import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

import GlobalProvider from "./globalProvider";
import NavigationHeader from "@/components/NavigationHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <GlobalProvider>
          <NavigationHeader></NavigationHeader>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
