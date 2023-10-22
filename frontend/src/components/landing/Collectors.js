"use client";
import { getTopCollectors } from "@/store/landing/actions";
import { selecLandingCollectors } from "@/store/landing/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import PreviewCollector from "@/components/drops/PreviewCollector";
import PageHeading from "../generic/PageHeading";

const Collectors = ({ data }) => {
  const dispatch = useDispatch();
  const collectors = useSelector((state) => selecLandingCollectors(state));

  useEffect(() => {
    dispatch(getTopCollectors());
  }, [dispatch]);

  if (!data?.length) return null;

  return (
    <div className="mt-24 mb-24">
      <PageHeading>TOP COLLECTORS</PageHeading>

      <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-10 gap-2">
        {(collectors?.length ? collectors : data).map((collector, index) => (
          <PreviewCollector
            key={collector.username}
            data={collector}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Collectors;
