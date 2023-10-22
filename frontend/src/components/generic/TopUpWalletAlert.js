import React from "react";
import { Alert } from "flowbite-react";
import { FaCoins } from "react-icons/fa6";
import Link from "next/link";

const TopUpWalletAlert = () => {
  return (
    <Alert className="mb-3" color="failure" icon={FaCoins}>
      <p className="flex items-center text-sm font-meidum">
        Insufficient balance; please top up your{" "}
        <Link className="ml-1 font-bold" href="/user/settings" target="_blank">
          wallet
        </Link>
        .
      </p>
    </Alert>
  );
};

export default TopUpWalletAlert;
