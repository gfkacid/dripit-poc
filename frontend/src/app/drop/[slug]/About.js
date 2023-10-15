import React from "react";
import Image from "next/image";
import _get from "lodash/get";
import { selectDropArtist, selectDropTrack } from "@/store/drop/selectors";
import { useSelector } from "react-redux";

const About = () => {
  const artist = useSelector(selectDropArtist);
  const track = useSelector(selectDropTrack);

  return (
    <div className="border-t border-gray pt-10 mt-10">
      <h3 className="antialiased font-semibold">About the track</h3>
      <p className="mt-4 antialiased font-light mb-10">{track?.about ?? ""}</p>

      <div className="flex items-center">
        <div className="w-24 h-24 rounded-lg relative">
          <Image
            alt="artist"
            src={artist?.cover}
            style={{ objectFit: "cover" }}
            className="h-full w-full rounded-lg"
            fill
          />
        </div>
        <div className="whitespace-nowrap overflow-hidden relative px-3">
          <p className="antialiased font-semibold">{_get(track, "name", "")}</p>
          <p className="text-gray">{_get(artist, "name", "-")}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
