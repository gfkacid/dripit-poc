"use client";

import { Navbar } from "flowbite-react";
import theme from "./theme";
import UserDropdown from "./UserDropdown";
import Navigation from "./Navigation";
import Logo from "@/components/generic/Logo";
import Link from "next/link";

export default function AppNavbar({ logout }) {
  return (
    <Navbar fluid rounded theme={theme.root}>
      <Link href="/" className={theme.brand.base}>
        <Logo />
      </Link>
      <div className="flex items-center md:order-2 ml-auto md:ml-6">
        <div className="md:border-l border-gray mr-6 h-[1.5rem]" />
        <UserDropdown logout={logout} />
        <Navbar.Toggle />
      </div>
      <Navigation />
    </Navbar>
  );
}
