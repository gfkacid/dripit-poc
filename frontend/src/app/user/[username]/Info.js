import React from "react";
import Moment from "react-moment";
import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import {
  selectUserArtistsCount,
  selectUserCreatedAt,
  selectUserInitials,
  selectUserName,
  selectUserProfileImage,
  selectUserTokensCount,
} from "@/store/user/selectors";

const Info = () => {
  const profileImage = useSelector(selectUserProfileImage);
  const initials = useSelector(selectUserInitials);
  const username = useSelector(selectUserName);
  const createdAt = useSelector(selectUserCreatedAt);
  const tokensCount = useSelector(selectUserTokensCount);
  const artistsCount = useSelector(selectUserArtistsCount);

  return (
    <div className=" flex items-center">
      <div className="flex items-center flex-1">
        <Avatar
          className="mr-6"
          alt="User"
          img={profileImage}
          placeholderInitials={!profileImage ? initials : null}
          size="xl"
          rounded
          bordered
        />
        <div>
          <h1 className="text-2xl font-extrabold mt-0 mb-1">@{username}</h1>
          {createdAt ? (
            <p className="text-gray font-sm">
              Joined <Moment format="DD/MM/YYYY">{createdAt}</Moment>
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col md:flex-row pr-4">
        <div className="text-center">
          <div className="font-medium text-lg">Tokens</div>
          <div className="font-bold text-xl">{tokensCount}</div>
        </div>
        <div className="mt-2 md:mt-0 md:ml-10 text-center">
          <div className="font-medium text-lg">Artists</div>
          <div className="font-bold text-xl">{artistsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
