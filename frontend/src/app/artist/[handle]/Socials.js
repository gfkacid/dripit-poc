import React from "react";
import _get from "lodash/get";
import { FaYoutube, FaSpotify, FaInstagram } from "react-icons/fa6";
import BorderedBox from "@/components/generic/BorderedBox";

const socials = [
  {
    id: "youtube_id",
    icon: <FaYoutube size={48} style={{ color: "rgb(255, 3, 2)" }} />,
    infoText: "Subscribers",
  },
  {
    id: "spotify_id",
    icon: <FaSpotify size={48} style={{ color: "#1db954" }} />,
    infoText: "Followers",
  },
  {
    id: "instragram_id",
    icon: <FaInstagram size={48} />,
    infoText: "Followers",
  },
];

function Socials({ artist }) {
  return (
    <div className="grid grid-cols-3 gap-2 xl:gap-10 mt-10">
      {socials.map((social) => (
        <BorderedBox key={social.id} height="h-24">
          <div className="w-full flex items-center justify-start px-1 xl:px-4">
            <div className="transform scale-50 xl:transform-none">
              {social.icon}
            </div>
            <div className="px-1 xl:pl-4 flex-1">
              <div className="font-mono uppercase font-semibold antialiased text-xl">
                2.5M
              </div>
              <div className="text-sm xl:text-base text-gray">
                {social.infoText}
              </div>
            </div>
          </div>
        </BorderedBox>
      ))}
    </div>
  );
}

export default Socials;
