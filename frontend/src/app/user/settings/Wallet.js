import React, { useCallback, useEffect, useState } from "react";

import { Badge, Banner, Button } from "flowbite-react";
import Image from "next/image";
import useSafeMoneriumPack from "@/utils/hooks/useSafeMoneriumPack";
import { useSearchParams } from "next/navigation";
import PageLoader from "@/components/generic/PageLoader";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { useSelector } from "react-redux";
import {
  selectAuthProvider,
  selectSelectedSafe,
} from "@/store/safe-global/selectors";
import { selectAccountIBAN } from "@/store/account/selectors";
import { ethers } from "ethers";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import ExportPrivateKey from "./ExportPrivateKey";

const Wallet = () => {
  useSafeMoneriumPack();
  const searchParams = useSearchParams();
  const linkWallet = searchParams.get("linkWallet");
  const authCode = searchParams.get("code");
  const [linkWalletInProgress, setLinkWalletInProgress] = useState(false);

  const authProvider = useSelector(selectAuthProvider);
  const selectedSafe = useSelector(selectSelectedSafe);
  const accountIBAN = useSelector(selectAccountIBAN);

  const fetchSafePendingTransactions = useCallback(async () => {
    if (!selectedSafe || !authProvider) return;

    try {
      const provider = new ethers.providers.Web3Provider(authProvider);
      const safeOwner = provider.getSigner();
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner,
      });

      const safe = await Safe.create({
        ethAdapter,
        safeAddress: selectedSafe,
      });

      const safeService = new SafeApiKit({
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
        ethAdapter,
      });

      const relayKit = new GelatoRelayPack(
        process.env.NEXT_PUBLIC_GELATO_API_KEY
      );

      const pendingTxs = await safeService.getPendingTransactions(selectedSafe);

      if (pendingTxs?.count) {
        const pendingSignTransaction = pendingTxs?.results?.find(
          (r) => r?.dataDecoded?.method === "signMessage"
        );

        if (pendingSignTransaction) {
          const safeTxHash = pendingSignTransaction?.safeTxHash;
          const transaction = await safeService.getTransaction(safeTxHash);
          const transactions = [transaction];
          const options = { isSponsored: true };

          const safeTransaction = await relayKit.createRelayedTransaction({
            safe,
            transactions,
            options,
          });

          const signedSafeTransaction = await safe.signTransaction(
            safeTransaction
          );

          await relayKit.executeRelayTransaction(
            signedSafeTransaction,
            safe,
            options
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [authProvider, selectedSafe]);

  useEffect(() => {
    let interval = null;

    if (linkWalletInProgress) {
      fetchSafePendingTransactions();
      interval = setInterval(fetchSafePendingTransactions, 18000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => (interval ? clearInterval(interval) : {});
  }, [linkWalletInProgress, fetchSafePendingTransactions]);

  useEffect(() => {
    if (accountIBAN) {
      setLinkWalletInProgress(false);
    }
  }, [accountIBAN]);

  return (
    <div className="pt-6">
      <Banner className="mb-5">
        <div className="flex flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl">
          <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center overflow-hidden">
            <div className="flex items-center pr-4 mr-4 border-r border-gray">
              <Image
                alt="safe"
                src={"/safe_icon.jpeg"}
                style={{ borderRadius: "8px" }}
                width={40}
                height={40}
              />
            </div>
            <p className="flex flex-nowrap items-center text-sm font-normal text-gray-500 flex-1 overflow-hidden">
              Your Safe wallet is deployed at
              <Badge
                className="mx-1 text-center truncate inline-block"
                color="gray"
              >
                {selectedSafe}
              </Badge>
              <a
                href={"https://goerli.etherscan.io/address/" + selectedSafe}
                target="_blank"
                style={{ marginLeft: "4px" }}
              >
                <FaArrowUpRightFromSquare />
              </a>
            </p>
          </div>
          <ExportPrivateKey />
        </div>
      </Banner>
      <Banner>
        <div className="flex flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl">
          <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
            <div className="flex items-center pr-4 mr-4 border-r border-gray">
              <Image alt="eur" src={"/EURe.svg"} width={40} height={40} />
            </div>
            {accountIBAN ? (
              <p className="flex items-center text-sm font-normal text-gray-500">
                Your wallet is successfully linked with Monerium. You can top it
                up anytime{" "}
                <a
                  className="ml-1 font-bold"
                  href="https://sandbox.monerium.dev/accounts"
                  target="_blank"
                >
                  here
                </a>
                .
              </p>
            ) : (
              <p className="flex items-center text-sm font-normal text-gray-500">
                Link your wallet to Monerium
              </p>
            )}
          </div>
          {!accountIBAN ? (
            <div className="flex flex-shrink-0 items-center">
              <Button
                className="bg-primary"
                size="sm"
                onClick={() => {
                  setLinkWalletInProgress(true);
                  window.open(
                    `${window.location.origin}/user/settings?linkWallet=true`
                  );
                }}
                disabled={!!linkWallet || linkWalletInProgress}
              >
                Link now
              </Button>
            </div>
          ) : null}
        </div>
      </Banner>

      {linkWallet || linkWalletInProgress || (authCode && !accountIBAN) ? (
        <PageLoader text="Linking with Monerium" />
      ) : null}
    </div>
  );
};

export default Wallet;
