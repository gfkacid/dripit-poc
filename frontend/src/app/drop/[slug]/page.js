"use client";
import PageLoader from "@/components/generic/PageLoader";
import { getDrop } from "@/store/drop/actions";
import { selectDropIsLoading, selectDropProfile } from "@/store/drop/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cover from "./Cover";
import About from "./About";
import Info from "./Info";
import WhatYouGet from "./WhatYouGet";
import AboutArtist from "./AboutArtist";
import TopCollectors from "./TopCollectors";
import AdditionalInfo from "./AdditionalInfo";

export default function Page({ params }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectDropIsLoading);
  const drop = useSelector(selectDropProfile);

  useEffect(() => {
    if (params.slug) dispatch(getDrop({ slug: params.slug }));
  }, [dispatch, params.slug]);

  if (isLoading || !drop) return <PageLoader />;

  return (
    <div className="pb-10">
      <Cover />
      <div className="max-w-screen-lg mx-auto px-5">
        <Info />
        <About />
        <WhatYouGet />
        <AboutArtist />
        <TopCollectors />
        <AdditionalInfo />
      </div>
    </div>
  );
}
