import React from "react";
import Image from "next/image";

import _get from "lodash/get";

const PreviewArtist = ({ artist, track, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-24 h-24 rounded-lg border border-2 bg-white relative">
        <Image
          alt="artist"
          src={artist?.cover}
          style={{ objectFit: "cover" }}
          className="h-full w-full rounded-lg"
          fill
        />
      </div>
      <div className="whitespace-nowrap overflow-hidden relative px-3">
        <p className="antialiased font-semibold text-2xl dynamic-text-shadow">
          {_get(track, "name", "")}
        </p>
        <p className="text-lg text-white mt-2 dynamic-text-shadow">
          {_get(artist, "name", "-")}
        </p>
      </div>
    </div>
  );
};

export default PreviewArtist;
