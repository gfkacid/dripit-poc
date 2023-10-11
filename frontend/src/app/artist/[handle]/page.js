"use client";
import PageLoader from "@/components/generic/PageLoader";
import {
  selectArtistIsLoading,
  selectArtistProfile,
} from "@/store/artist/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cover from "./Cover";
import About from "./About";
import { getArtist } from "@/store/artist/actions";
import Drops from "./Drops";

export default function Page({ params }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectArtistIsLoading);
  const artist = useSelector(selectArtistProfile);

  useEffect(() => {
    if (params.handle) dispatch(getArtist({ handle: params.handle }));
  }, [dispatch, params.handle]);

  if (isLoading || !artist) return <PageLoader />;

  return (
    <div className="pb-10">
      <Cover />
      <div className="max-w-screen-lg mx-auto px-5">
        <About />
        <Drops />
      </div>
    </div>
  );
}
