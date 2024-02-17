import { Metadata } from "next";

export const metatdata: Metadata = {
  title: "DM Tools - Register",
};

const GuestLayout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default GuestLayout;
