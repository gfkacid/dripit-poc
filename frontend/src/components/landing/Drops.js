"use client";
import { getlatestDrops } from "@/store/landing/actions";
import { selecLandingDrops } from "@/store/landing/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import PreviewDrop from "@/components/drops/PreviewDrop";
import PageHeading from "../generic/PageHeading";

const Drops = ({ data }) => {
  const dispatch = useDispatch();
  const drops = useSelector((state) => selecLandingDrops(state));

  useEffect(() => {
    dispatch(getlatestDrops());
  }, [dispatch]);

  if (!data?.length) return null;

  return (
    <div className="mt-24 mb-24">
      <PageHeading>LATEST DROPS</PageHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {(drops?.length ? drops : data).map((drop) => (
          <PreviewDrop key={drop.id} data={drop} />
        ))}
      </div>
    </div>
  );
};

export default Drops;
