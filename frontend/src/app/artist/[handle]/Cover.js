import { selectArtistProfile } from "@/store/artist/selectors";
import { useSelector } from "react-redux";
import React from "react";
import Image from "next/image";

import _get from "lodash/get";

function Cover() {
  const artist = useSelector(selectArtistProfile);

  return (
    <div className="relative h-[24rem] bg-gray">
      <Image
        alt="drop"
        src={artist?.cover}
        style={{ objectFit: "cover" }}
        className="h-full w-full"
        fill
      />

      <div className="absolute bottom-10 left-10 text-white">
        <h1 className="font-bold text-3xl mb-10">{artist.name}</h1>
        <div className="flex">
          <div className="pr-10">
            <div className="font-mono font-bold text-xl">
              {artist?.drops_count || 0}
            </div>
            <div className="text-sm">Drops</div>
          </div>
          <div className="pr-5">
            <div className="font-mono font-bold text-xl">
              {artist?.collectors_count || 0}
            </div>
            <div className="text-sm">Collectors</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;
