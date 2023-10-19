import React from "react";
import Image from "next/image";
import _get from "lodash/get";
import { selectDropArtist } from "@/store/drop/selectors";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Socials from "@/app/artist/[handle]/Socials";

const AboutArtist = () => {
  const artist = useSelector(selectDropArtist);
  const router = useRouter();

  return (
    <div className="pt-10 mt-10">
      <div className="relative h-[28rem] rounded-xl">
        <Image
          alt="drop"
          src={artist?.cover}
          style={{ objectFit: "cover" }}
          className="h-full w-full rounded-xl"
          fill
        />
        <div className="backdrop rounded-xl"></div>
        <div className="absolute w-3/5 left-10 bottom-10 text-white flex flex-col overflow-hidden">
          <h4 className="text-xl mb-4 font-bold antialiased">
            {_get(artist, "name", "")}
          </h4>
          <p className="text-lg mb-5 antialiased truncate-multi-lines">
            {_get(artist, "bio", "")}
          </p>
          <Button
            className="bg-white"
            color="white"
            size="sm"
            onClick={() => router.push(`/artist/${artist.handle}`)}
          >
            VIEW PROFILE
          </Button>
        </div>
      </div>

      <Socials artist={artist} />
    </div>
  );
};

export default AboutArtist;
