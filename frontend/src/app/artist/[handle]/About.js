import React from "react";
import _get from "lodash/get";
import { selectArtistProfile } from "@/store/artist/selectors";
import { useSelector } from "react-redux";
import Socials from "./Socials";

const About = () => {
  const artist = useSelector(selectArtistProfile);

  return (
    <div className="mt-10">
      <h3 className="antialiased font-semibold">About</h3>
      <p className="mt-4 antialiased font-light mb-10">{artist.bio || ""}</p>
      <Socials artist={artist} />
    </div>
  );
};

export default About;
