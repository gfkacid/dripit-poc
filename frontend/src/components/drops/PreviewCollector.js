import React from "react";
import Link from "next/link";
import { Avatar } from "flowbite-react";
import _get from "lodash/get";

const PreviewCollector = ({ data, rank }) => {
  return (
    <div className="mb-5">
      <div className="relative flex flex-col items-center content-center">
        {rank ? (
          <div className="z-10 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-white border-2 text-sm font-bold">
            #{rank}
          </div>
        ) : null}
        <Avatar
          className="-mt-5"
          alt="collector avatar"
          img={data.image}
          size="lg"
          rounded
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-1">
        <Link className="text-sm font-medium" href={`/user/${data.username}`}>
          @{data.username}
        </Link>
        <span className="text-xs text-gray mt-1">
          {data.nfts_owned_count} tokens
        </span>
      </div>
    </div>
  );
};

export default PreviewCollector;
