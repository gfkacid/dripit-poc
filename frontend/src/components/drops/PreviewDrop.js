import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import _get from "lodash/get";
import { Badge } from "flowbite-react";
import { dropHasEnded, dropIsUpcoming } from "@/utils/functions";
import Moment from "react-moment";

const PreviewDrop = ({ data }) => {
  const { track, slug } = data || {};
  const { artist } = track || {};
  const router = useRouter();

  const hasEnded = dropHasEnded(data);
  const isUpcoming = dropIsUpcoming(data);

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
        className="h[8rem] font-medium p-4 shadow-xl rounded-xl border border-gray-100 absolute bg-white items-center flex"
      >
        <div
          className="relative overflow-hidden w-18 h-18 rounded-lg mr-3"
          style={{ minWidth: "4rem" }}
        >
          <Image
            alt="drop"
            src={track.image}
            style={{ objectFit: "cover" }}
            width={80}
            height={80}
            className="rounded-lg h-full"
          />
        </div>
        <div className="overflow-hidden flex-1">
          <div className="truncate text-lg">{_get(track, "name", "")}</div>
          <div className="truncate mb-1 text-xs uppercase text-gray">
            {_get(artist, "name", "")}
          </div>
          <div className="flex truncate mb-1 text-xs">
            {hasEnded ? (
              <>
                Ended&nbsp;<Moment format="DD/MM/YYYY">{data?.ends_at}</Moment>
              </>
            ) : isUpcoming ? (
              <>
                Starts&nbsp;<Moment fromNow>{data?.starts_at}</Moment>
              </>
            ) : (
              <>
                Ends&nbsp;<Moment fromNow>{data?.ends_at}</Moment>
              </>
            )}
          </div>
          <div className="text-sm flex items-center">
            <div className="flex-1">
              <strong>{data?.minted || 0}</strong>/{data.supply}
            </div>
            {data?.sold_out ? (
              <Badge color="failure" size="xs">
                SOLD OUT
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDrop;
