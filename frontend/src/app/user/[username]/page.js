"use client";
import PageLoader from "@/components/generic/PageLoader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/user/actions";
import { selectUserIsLoading, selectUserProfile } from "@/store/user/selectors";
import Info from "./Info";
import Holdings from "./Holdings";

export default function Page({ params }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const user = useSelector(selectUserProfile);

  useEffect(() => {
    if (params.username)
      dispatch(getUserProfile({ username: params.username }));
  }, [dispatch, params.username]);

  if (isLoading || !user) return <PageLoader />;

  return (
    <div className="max-w-screen-lg mx-auto px-5 pb-10 pt-2">
      <Info />
      <Holdings />
    </div>
  );
}
