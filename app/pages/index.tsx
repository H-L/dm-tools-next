import Head from "next/head";
import Link from "next/link";

import NavigationHeader from "@/components/NavigationHeader";

export default function Home() {
  return (
    <>
      <Head>
        <title>DM Tools</title>
      </Head>
      <NavigationHeader></NavigationHeader>
      <>
        <Link href="/login">
          <div className="text-sm text-gray-700 underline">Login</div>
        </Link>

        <Link href="/register">
          <div className="ml-4 text-sm text-gray-700 underline">Register</div>
        </Link>
      </>
    </>
  );
}
