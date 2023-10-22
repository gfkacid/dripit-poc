"use client";

import React from "react";
import { Dropdown, Avatar, Button } from "flowbite-react";
import {
  selectAuthIsPending,
  selectIsAuthenticated,
} from "@/store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { toogleAuthModal } from "@/store/auth/slice";
import {
  selectAccountBalance,
  selectAccountEmail,
  selectAccountName,
  selectAccountNameInitials,
  selectAccountProfileImage,
} from "@/store/account/selectors";
import { selectSelectedSafe } from "@/store/safe-global/selectors";
import { FaUser, FaGear, FaRightFromBracket } from "react-icons/fa6";
import { displayBlockchainAddress } from "@/utils/functions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SafeLogo from "../generic/SafeLogo";
import CopyText from "../generic/CopyText";

export default function UserDropdown({ logout }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const profileImage = useSelector(selectAccountProfileImage);
  const name = useSelector(selectAccountName);
  const email = useSelector(selectAccountEmail);
  const initials = useSelector(selectAccountNameInitials);
  const authIsPending = useSelector(selectAuthIsPending);
  const accountBalance = useSelector(selectAccountBalance);
  const selectedSafe = useSelector(selectSelectedSafe);
  const router = useRouter();

  if (!isAuthenticated)
    return (
      <Button
        color="primary"
        className="bg-primary"
        size="sm"
        onClick={() => dispatch(toogleAuthModal(true))}
        disabled={authIsPending}
      >
        Sign In
      </Button>
    );

  return (
    <Dropdown
      inline
      dismissOnClick={false}
      label={
        <Avatar
          alt="User settings"
          img={profileImage}
          rounded
          placeholderInitials={!profileImage ? initials : null}
        />
      }
    >
      <Dropdown.Header>
        <div className="text-sm font-bold">{name ?? ""}</div>
        <div className="truncate text-sm">{email ?? ""}</div>
      </Dropdown.Header>

      <Dropdown.Item
        as="div"
        className="border-0 outline-none"
        icon={FaUser}
        onClick={() => router.push(`/user/${name}`)}
      >
        Profile
      </Dropdown.Item>
      <Dropdown.Item
        as="div"
        className="border-0 outline-none"
        icon={FaGear}
        onClick={() => router.push(`/user/settings`)}
      >
        Settings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        as="div"
        type="div"
        className="border-0 outline-none flex items-center relative"
        icon={SafeLogo}
      >
        <span className="pl-1 flex-1">
          {displayBlockchainAddress(selectedSafe)}
        </span>

        <CopyText text={selectedSafe} />
      </Dropdown.Item>
      <Dropdown.Header>
        <div className="flex items-center">
          <div className="relative flex items-center">
            <Image alt="EURe" src={"/EURe.svg"} width={20} height={20} />
            <span className="pl-1 font-semibold">EURe</span>
          </div>
          <div className="flex-1 pl-1 font-bold text-right truncate">
            {accountBalance}
          </div>
        </div>
      </Dropdown.Header>
      <Dropdown.Item
        className="border-0 outline-none"
        icon={FaRightFromBracket}
        onClick={logout}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
