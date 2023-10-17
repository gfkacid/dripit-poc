import { selectDropArtist, selectDropTrack } from "@/store/drop/selectors";
import { useSelector } from "react-redux";
import React from "react";
import Image from "next/image";

import _get from "lodash/get";
import PreviewArtist from "@/components/drops/PreviewArtist";
// import PlaySampleAudio from "@/components/drops/PlaySampleAudio";

function Cover() {
  const track = useSelector(selectDropTrack);
  const artist = useSelector(selectDropArtist);

  return (
    <div className="relative h-[24rem] bg-gray">
      <Image
        alt="drop"
        src={track?.cover}
        style={{ objectFit: "cover" }}
        className="h-full w-full"
        fill
      />

      <PreviewArtist
        artist={artist}
        track={track}
        className="absolute bottom-10 left-10 text-white"
      />

      {/* <PlaySampleAudio /> */}
    </div>
  );
}

export default Cover;
