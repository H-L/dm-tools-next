"use client";

import { Metadata } from "next";
import Link from "next/link";

export const metatdata: Metadata = {
  title: "DM Tools",
};

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <>
      <Link href="/login">
        <div className="text-sm text-gray-700 underline">Login</div>
      </Link>

      <Link href="/register">
        <div className="ml-4 text-sm text-gray-700 underline">Register</div>
      </Link>
    </>
  );
}
