"use client";

import { useSelector } from "react-redux";
import Navbar from "./navbar/index";
// import Footer from './footer'
import { selectAuthIsInitialized } from "@/store/auth/selectors";
// import useWeb3Auth from "@/utils/hooks/useWeb3Auth";
import useSafeAuthKit from "@/utils/hooks/useSafeAuthKit";
import PageLoader from "@/components/generic/PageLoader";

export default function Layout({ children }) {
  const authIsInitialized = useSelector(selectAuthIsInitialized);
  const { logout } = useSafeAuthKit();

  return authIsInitialized ? (
    <>
      <Navbar logout={logout} />
      <main id="main">{children}</main>
      {/* <Footer /> */}{" "}
    </>
  ) : (
    <PageLoader />
  );
}
