"use client";
import { selectIsAuthenticated } from "@/store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { toogleAuthModal } from "@/store/auth/slice";
import { useEffect } from "react";

const Unautenticated = () => null;

const withAuth = (Component) => {
  const Auth = (props) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!isAuthenticated) dispatch(toogleAuthModal(true));
    }, [dispatch, isAuthenticated]);

    if (!isAuthenticated) {
      return <Unautenticated {...props} />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
