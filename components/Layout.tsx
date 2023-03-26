import Head from "next/head";
import NavigationHeader from "@/components/NavigationHeader";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>DM Tools</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavigationHeader></NavigationHeader>
        {children}
      </main>
    </>
  );
}
