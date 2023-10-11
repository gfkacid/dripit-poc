import React from "react";
import _get from "lodash/get";
import { selectDropTrack } from "@/store/drop/selectors";
import { useSelector } from "react-redux";
import { Badge } from "flowbite-react";
import {
  FaRegCalendarDays,
  FaMusic,
  FaLocationDot,
  FaRegNewspaper,
} from "react-icons/fa6";
import Moment from "react-moment";

const AdditionalInfo = () => {
  const track = useSelector(selectDropTrack);

  return (
    <div className="border-t border-gray pt-10 mt-10">
      <h3 className="antialiased font-semibold">Additional Info</h3>
      <div className="grid grid-cols-2 gap-5 mt-4">
        <Badge className="px-3" color="gray" icon={FaRegCalendarDays} size="lg">
          <span className="font-normal pl-4 leading-none">
            Released <Moment format="DD/MM/YYYY">{track?.released_at}</Moment>
          </span>
        </Badge>
        <Badge className="px-3" color="gray" icon={FaMusic} size="lg">
          <span className="font-normal pl-4 leading-none">
            ISRC: {_get(track, "isrc", "-")}
          </span>
        </Badge>
        <Badge className="px-3" color="gray" icon={FaLocationDot} size="lg">
          <span className="font-normal pl-4 leading-none">
            Contract address
          </span>
        </Badge>
        <Badge className="px-3" color="gray" icon={FaRegNewspaper} size="lg">
          <span className="font-normal pl-4 leading-none">Legal</span>
        </Badge>
      </div>
    </div>
  );
};

export default AdditionalInfo;
