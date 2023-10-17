import React from "react";
import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import {
  selectAccountName,
  selectAccountNameInitials,
  selectAccountProfileImage,
} from "@/store/account/selectors";

const Info = () => {
  const profileImage = useSelector(selectAccountProfileImage);
  const initials = useSelector(selectAccountNameInitials);
  const username = useSelector(selectAccountName);

  return (
    <div className="mb-10">
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
          <p className="text-gray font-sm">ashasisaiojsasasjiaosoij</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
