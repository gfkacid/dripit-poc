"use client";
import { getTopCollectors } from "@/store/landing/actions";
import { selecLandingCollectors } from "@/store/landing/selectors";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import PreviewCollector from "@/components/drops/PreviewCollector";

const Collectors = () => {
  const dispatch = useDispatch();
  const collectors = useSelector(selecLandingCollectors);

  useEffect(() => {
    dispatch(getTopCollectors());
  }, [dispatch]);

  if (!collectors?.length) return null;

  return (
    <div className="mt-24 mb-24">
      <h4 className="text-sm mb-10">_ TOP COLLECTORS</h4>

      <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-10 gap-2">
        {collectors.map((collector, index) => (
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
