import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import _get from "lodash/get";

const PreviewDrop = ({ data }) => {
  const { track, slug } = data || {};
  const { artist } = track || {};
  const router = useRouter();

  return (
    <div
      className="relative h-[21rem] flex flex-col cursor-pointer"
      onClick={() => router.push(`/drop/${slug}`)}
    >
      <div className="h-[18rem] w-full relative rounded-xl overflow-hidden">
        <Image
          alt="drop"
          src={track.cover}
          style={{ objectFit: "cover" }}
          className="h-full w-full"
          fill
        />
      </div>
      <div
        style={{ width: "90%", left: "5%", bottom: "0rem" }}
        className="h[8rem] font-medium p-6 shadow-xl rounded-xl border border-gray-300 absolute bg-white items-center flex"
      >
        <div
          className="relative overflow-hidden w-16 h-16 rounded-full mr-2"
          style={{ minWidth: "4rem" }}
        >
          <Image
            alt="drop"
            src={artist.cover}
            style={{ objectFit: "cover" }}
            width={64}
            height={64}
            className="rounded-full h-full"
          />
        </div>
        <div className="overflow-hidden flex-1">
          <div className="truncate text-lg">{_get(track, "name", "")}</div>
          <div className="truncate mb-1 text-xs uppercase text-gray">
            {_get(artist, "name", "")}
          </div>
          {data.supply ? (
            <div className="text-sm">
              <strong>{data?.minted || 0}</strong>/{data.supply}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PreviewDrop;
