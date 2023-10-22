"use client";
import React, { useEffect } from "react";
import withAuth from "@/components/hoc/withAuth";
import PageLoader from "@/components/generic/PageLoader";

import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/auth/selectors";
import { getPortfolio } from "@/store/account/actions";
import { selectPortfolioIsLoading } from "@/store/account/selectors";
import Royalties from "./Royalties";

function Portfolio() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectPortfolioIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) dispatch(getPortfolio());
  }, [dispatch, isAuthenticated]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="max-w-screen-lg mx-auto px-5 pb-10 pt-2">
      <h1 className="antialiased font-semibold">My Portfolio</h1>

      <div className="border-t border-gray pt-10 mt-10">
        <h3 className="antialiased text-sm font-semibold mb-4">
          Claim Royalties
        </h3>

        <Royalties />
      </div>
    </div>
  );
}

export default withAuth(Portfolio);
