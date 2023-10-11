"use client";
import { getlatestDrops } from "@/store/landing/actions";
import { selecLandingDrops } from "@/store/landing/selectors";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import PreviewDrop from "@/components/drops/PreviewDrop";

const Drops = () => {
  const dispatch = useDispatch();
  const drops = useSelector(selecLandingDrops);

  useEffect(() => {
    dispatch(getlatestDrops());
  }, [dispatch]);

  if (!drops?.length) return null;

  return (
    <div className="mt-24 mb-24">
      <h4 className="text-sm mb-10">_ LATEST DROPS</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {drops.map((drop) => (
          <PreviewDrop key={drop.id} data={drop} />
        ))}
      </div>
    </div>
  );
};

export default Drops;
