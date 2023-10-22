import React from "react";
import Link from "next/link";
import Image from "next/image";

import _get from "lodash/get";

const PreviewActivity = ({ activity }) => {
  const { track, user } = activity;

  return (
    <div className="flex items-center w-full">
      <div
        className="relative overflow-hidden rounded-lg w-16 h-16"
        style={{ minWidth: "4rem" }}
      >
        <Image
          alt="drop"
          src={track.image}
          style={{ objectFit: "cover" }}
          width={64}
          height={64}
        />
      </div>
      <div className="flex-1 flex flex-col text-sm pl-2 pr-3">
        <div>
          <Link className="font-medium" href={`/user/${user.username}`}>
            @{user.username}
          </Link>{" "}
          {activity.type=='mint' ? (
            <>
              bought {track.name} by {activity.artist_name}
            </>
          ) : (
            <>
              claimed {activity.usd_value} royalties from {track.name}
            </>
          )}
        </div>
        <div className="text-gray mt-1 text-xs">$10</div>
      </div>
    </div>
  );
};

export default PreviewActivity;
