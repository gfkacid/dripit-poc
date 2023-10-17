"use client";

import { useSelector } from "react-redux";
import Navbar from "./navbar/index";
import PageLoader from "@/components/generic/PageLoader";
import { selectAuthIsInitialized } from "@/store/auth/selectors";
import useSafeAuthKit from "@/utils/hooks/useSafeAuthKit";
import useBlockchain from "@/utils/hooks/useBlockchain";

export default function Layout({ children }) {
  const authIsInitialized = useSelector(selectAuthIsInitialized);
  const { logout } = useSafeAuthKit();
  useBlockchain();

  return authIsInitialized ? (
    <>
      <Navbar logout={logout} />
      <main id="main">{children}</main>
    </>
  ) : (
    <PageLoader />
  );
}
