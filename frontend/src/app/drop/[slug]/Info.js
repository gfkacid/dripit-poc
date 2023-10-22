import {
  selectDropHasEnded,
  selectDropIsActive,
  selectDropIsSoldOut,
  selectDropIsUpcoming,
  selectDropProfile,
} from "@/store/drop/selectors";
import Moment from "react-moment";
import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/auth/selectors";
import BuyTokens from "./BuyTokens";
import Image from "next/image";
import { displayPrice } from "@/utils/functions";
import { Badge } from "flowbite-react";

const Info = () => {
  const isDropOpen = useSelector(selectDropIsActive);
  const dropHasEnded = useSelector(selectDropHasEnded);
  const isUpcoming = useSelector(selectDropIsUpcoming);
  const drop = useSelector(selectDropProfile);
  const isSoldOut = useSelector(selectDropIsSoldOut);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="mt-10">
      <h3 className="antialiased font-semibold">Drop Info</h3>
      <div className="mt-4 antialiased font-light">
        <div className="flex items-center mb-4">
          <div className="w-36">
            {dropHasEnded
              ? "Drop ended at:"
              : isUpcoming
              ? "Drops:"
              : "Drop closes:"}
          </div>
          <div className="font-semibold">
            {dropHasEnded ? (
              <Moment format="DD/MM/YYYY">{drop?.ends_at}</Moment>
            ) : isUpcoming ? (
              <Moment fromNow>{drop?.starts_at}</Moment>
            ) : (
              <Moment fromNow>{drop?.ends_at}</Moment>
            )}
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-36">Price:</div>
          <div className="font-semibold flex items-center">
            <Image
              alt="eur"
              src={"/EURe.svg"}
              style={{ display: "inline-block" }}
              width={20}
              height={20}
            />
            <span className="ml-1">{displayPrice(drop?.price)}</span>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-36">Supply:</div>
          <div className="font-semibold">
            <span>{drop?.supply} tokens</span>
          </div>
        </div>
        {!isSoldOut ? (
          <div className="flex items-center mb-4">
            <div className="w-36">Remaining:</div>
            <div className="font-semibold">
              <strong>{drop?.supply - drop?.minted}</strong>/{drop?.supply}
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-4">
            <Badge color="failure">SOLD OUT</Badge>
          </div>
        )}

        {isDropOpen && !isSoldOut && isAuthenticated ? (
          <div className="pt-4">
            <BuyTokens />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Info;
