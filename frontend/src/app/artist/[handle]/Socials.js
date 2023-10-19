import React from "react";
import _get from "lodash/get";
import { FaYoutube, FaSpotify, FaInstagram } from "react-icons/fa6";
import BorderedBox from "@/components/generic/BorderedBox";
import { displaySocialNums } from "@/utils/functions";

function Socials({ artist }) {

  const socialInfo = artist.latest_extras[0]
  return (
    <div className="grid grid-cols-3 gap-2 xl:gap-10 mt-10">
      {socialInfo.youtube_subs && (
        <a href={'https://youtube.com/'+artist.youtube_id} target="_blank">
          <BorderedBox height="h-24">
          <div className="w-full flex items-center justify-start px-1 xl:px-4">
            <div className="transform scale-50 xl:transform-none">
              <FaYoutube size={48} style={{ color: "rgb(255, 3, 2)" }} />
            </div>
            <div className="px-1 xl:pl-4 flex-1">
              <div className="font-mono uppercase font-semibold antialiased text-xl">
                {displaySocialNums(socialInfo.youtube_subs)}
              </div>
              <div className="text-sm xl:text-base text-gray">
                Subscribers
              </div>
            </div>
          </div>
        </BorderedBox>
      </a>
      )}
      {socialInfo.spotify_monthly_listeners && (
        <a href={'https://open.spotify.com/artist/'+artist.spotify_id} target="_blank">
          <BorderedBox height="h-24">
          <div className="w-full flex items-center justify-start px-1 xl:px-4">
            <div className="transform scale-50 xl:transform-none">
              <FaSpotify size={48} style={{ color: "#1db954" }} />
            </div>
            <div className="px-1 xl:pl-4 flex-1">
              <div className="font-mono uppercase font-semibold antialiased text-xl">
                {displaySocialNums(socialInfo.spotify_monthly_listeners)}
              </div>
              <div className="text-sm xl:text-base text-gray">
              Monthly Listeners
              </div>
            </div>
          </div>
        </BorderedBox>
      </a>
      )}
      {socialInfo.insta_followers && (
        <a href={'https://instagram.com/'+artist.instagram} target="_blank">
          <BorderedBox height="h-24">
          <div className="w-full flex items-center justify-start px-1 xl:px-4">
            <div className="transform scale-50 xl:transform-none">
              <FaInstagram size={48} style={{color: '#444'}}/>
            </div>
            <div className="px-1 xl:pl-4 flex-1">
              <div className="font-mono uppercase font-semibold antialiased text-xl">
                {displaySocialNums(socialInfo.insta_followers)}
              </div>
              <div className="text-sm xl:text-base text-gray">
                Followers
              </div>
            </div>
          </div>
        </BorderedBox>
      </a>
      )}

      
    </div>
  );
}

export default Socials;
