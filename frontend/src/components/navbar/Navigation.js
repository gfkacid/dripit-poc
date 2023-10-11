"use client";

import { Navbar } from "flowbite-react";
import theme from "./theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/auth/selectors";

const NavLink = ({ children, href, withAuth }) => {
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (withAuth && !isAuthenticated) return null;

  return (
    <Link
      href={href}
      className={`${theme.link.base} ${
        pathname === href ? theme.link.active.on : theme.link.active.off
      }`}
    >
      {children}
    </Link>
  );
};
export default function Navigation() {
  return (
    <Navbar.Collapse theme={theme.collapse}>
      <NavLink href="/">Discover</NavLink>
      <NavLink href="/portfolio" withAuth>
        Portfolio
      </NavLink>
    </Navbar.Collapse>
  );
}
