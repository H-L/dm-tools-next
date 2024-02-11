import Head from "next/head";
import NavigationHeader from "../NavigationHeader";

const GuestLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>DM Tools - Register</title>
      </Head>

      <NavigationHeader></NavigationHeader>
      <main>{children}</main>
    </div>
  );
};

export default GuestLayout;
