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
import BuyRoyalties from "./BuyRoyalties";
import { displayPrice } from "@/utils/functions";

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
          <div className="font-semibold">
            € <span className="text-lg">{displayPrice(drop?.price)}</span>
          </div>
        </div>
        {!isSoldOut ? (
          <div className="flex items-center mb-4">
            <div className="w-36">Remaining:</div>
            <div className="font-semibold">
              <strong>{drop?.minted}</strong>/{drop?.supply}
            </div>
          </div>
        ) : (
          <div className="font-bold text-xl text-red-500">SOLD OUT</div>
        )}

        {isDropOpen && !isSoldOut && isAuthenticated ? (
          <div className="pt-4">
            <BuyRoyalties />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Info;
