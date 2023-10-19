import React from "react";
import {
  selectDropArtist,
  selectDropProfile,
  selectDropTrack,
} from "@/store/drop/selectors";
import { useSelector } from "react-redux";
import _get from "lodash/get";
import BorderedBox from "@/components/generic/BorderedBox";
import { FaBolt, FaHeadset } from "react-icons/fa6";

const WhatYouGet = () => {
  const artist = useSelector(selectDropArtist);
  const track = useSelector(selectDropTrack);
  const drop = useSelector(selectDropProfile);

  return (
    <div className="border-t border-gray pt-10 mt-10">
      <h3 className="antialiased font-semibold">What you get</h3>

      <p className="mt-4 antialiased font-light mb-10">
        Buy a token to unlock streaming royalties for the track{" "}
        <span className="font-normal">{track.name}</span> and exclusive extras
        from <span className="font-normal">{_get(artist, "name", "-")}</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <BorderedBox>
          <div className="font-semibold">Royalties</div>
          <div className="text-green font-bold font-mono mt-2">
            {drop?.royalties_share / 100}%
          </div>
        </BorderedBox>
        {drop.extras.first_dibs && (
          <BorderedBox>
            <div className="font-semibold">First Dibs</div>
            <FaBolt size={32} style={{ color: "#FFEB3B" }} />
          </BorderedBox>
        )}
        {drop.extras.virtual_event && (
          <BorderedBox>
            <div className="font-semibold">Virtual Event</div>
            <FaHeadset size={32} style={{ color: "#999" }} />
          </BorderedBox>
        )}
      </div>
    </div>
  );
};

export default WhatYouGet;
