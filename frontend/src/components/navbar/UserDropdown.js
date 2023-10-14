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
  selectAccountEmail,
  selectAccountName,
  selectAccountNameInitials,
  selectAccountProfileImage,
} from "@/store/account/selectors";

export default function UserDropdown({ logout }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const profileImage = useSelector(selectAccountProfileImage);
  const name = useSelector(selectAccountName);
  const email = useSelector(selectAccountEmail);
  const initials = useSelector(selectAccountNameInitials);
  const authIsPending = useSelector(selectAuthIsPending);

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
        <span className="block text-sm">{name ?? ""}</span>
        <span className="block truncate text-sm font-medium">
          {email ?? ""}
        </span>
      </Dropdown.Header>
      <Dropdown.Item className="border-0 outline-none">Profile</Dropdown.Item>
      <Dropdown.Item className="border-0 outline-none">Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className="border-0 outline-none" onClick={logout}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
