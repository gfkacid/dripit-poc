import React, { useCallback, useEffect, useState } from "react";

import { Banner, Button } from "flowbite-react";
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

const Wallet = () => {
  const { moneriumClient } = useSafeMoneriumPack();
  const searchParams = useSearchParams();
  const linkWallet = searchParams.get("linkWallet");
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
      console.log("PENDING RESPONSE", pendingTxs);

      if (pendingTxs?.count) {
        const pendingSignTransaction = pendingTxs?.results?.find(
          (r) => r?.dataDecoded?.method === "signMessage"
        );

        console.log("pendingSignTransaction:", pendingSignTransaction);

        if (pendingSignTransaction) {
          const safeTxHash = pendingSignTransaction?.safeTxHash;
          const transaction = await safeService.getTransaction(safeTxHash);
          const transactions = [
            transaction
          ];
          const options = {
            isSponsored: true,
          };

          const safeTransaction = await relayKit.createRelayedTransaction({
            safe,
            transactions,
            options,
          });

          const signedSafeTransaction = await safe.signTransaction(
            safeTransaction
          );

          const response = await relayKit.executeRelayTransaction(
            signedSafeTransaction,
            safe,
            options
          );

          console.log(
            `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`,
            response
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
    }

    return () => (interval ? clearInterval(interval) : {});
  }, [linkWalletInProgress, fetchSafePendingTransactions]);

  return (
    <div className="pt-6">
      {accountIBAN ? (
        <p>Your wallet is successfully linked with Monerium. You can top it up anytime <a href="https://sandbox.monerium.dev/accounts" target="_blank">here</a></p>
      ):(
      <Banner>
        <div className="flex flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl">
          <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
            <div className="flex items-center pr-4 mr-4 border-r border-gray">
              <Image alt="eur" src={"/eur.svg"} width={40} height={40} />
            </div>
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              Link your wallet to Monerium
            </p>
          </div>
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
        </div>
      </Banner>
      )
      }
      

      {linkWallet || linkWalletInProgress ? <PageLoader /> : null}
    </div>
  );
};

export default Wallet;
