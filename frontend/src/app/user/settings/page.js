"use client";
import React from "react";
import withAuth from "@/components/hoc/withAuth";
import Info from "./Info";
import Form from "./Form";
import Wallet from "./Wallet";

import { Tabs } from "flowbite-react";
import { FaUser, FaGear, FaWallet, FaRightFromBracket } from "react-icons/fa6";

function Settings() {
  return (
    <div className="max-w-screen-lg mx-auto px-5 pb-10 pt-2">
      <Info />

      <Tabs.Group aria-label="tabs" style="underline">
        <Tabs.Item active icon={FaWallet} title="Wallet">
          <Wallet />
        </Tabs.Item>
        <Tabs.Item active icon={FaUser} title="Profile">
          <Form />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default withAuth(Settings);
