import React, { useState } from "react";
import { Table, Avatar, Button, Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { selectPortfolioRoyalties } from "@/store/account/selectors";
import {
  selectAppScopedPrivkey,
  selectAuthProvider,
  selectSelectedSafe,
} from "@/store/safe-global/selectors";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { FaCoins, FaCircleCheck } from "react-icons/fa6";
import { ethers } from "ethers";
import { claimRoyalties } from "@/store/account/actions";
import Moment from "react-moment";
import Image from "next/image";
import PageLoader from "@/components/generic/PageLoader";
import claimABI from "@/utils/blockchain/claim_abi.json";

const Royalties = () => {
  const royalties = useSelector(selectPortfolioRoyalties);
  const [isPending, setIsPending] = useState(false);
  const [claimError, setClaimError] = useState(false);
  const authProvider = useSelector(selectAuthProvider);
  const selectedSafe = useSelector(selectSelectedSafe);
  const appScopedPrivkey = useSelector(selectAppScopedPrivkey);
  const dispatch = useDispatch();

  const onClaimRoyalties = async (data, index) => {
    try {
      setIsPending(true);
      setClaimError(false);

      const { royalty_round_id, claim_id, payout } = data;
      const params = { claim_id, value: payout, index };

      // Execute claim transaction
      const provider = new ethers.providers.Web3Provider(authProvider);
      const safeOwner = new ethers.Wallet(appScopedPrivkey, provider);

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner,
      });
      const safe = await Safe.create({
        ethAdapter,
        safeAddress: selectedSafe,
      });
      const relayKit = new GelatoRelayPack(
        process.env.NEXT_PUBLIC_GELATO_API_KEY
      );

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ROYALTIES_CONTRACT,
        claimABI,
        safeOwner
      );

      // Encode the parameters
      const calldata = contract.interface.encodeFunctionData(
        "claim(uint256,address)",
        [royalty_round_id, selectedSafe]
      );

      const transactions = [
        {
          to: process.env.NEXT_PUBLIC_ROYALTIES_CONTRACT,
          data: calldata,
          value: 0,
        },
      ];

      const options = { isSponsored: true };

      const safeTransaction = await relayKit.createRelayedTransaction({
        safe,
        transactions,
        options,
      });

      const signedSafeTransaction = await safe.signTransaction(safeTransaction);

      const response = await relayKit.executeRelayTransaction(
        signedSafeTransaction,
        safe,
        options
      );

      await dispatch(claimRoyalties(params)).unwrap();

      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setClaimError(true);
    }
  };

  return (
    <>
      {claimError && (
        <Alert
          className="mb-5"
          color="failure"
          onDismiss={() => setClaimError(false)}
        >
          <p className="font-medium">
            Failed to claim your royalties at this moment. Please try again
            later.
          </p>
        </Alert>
      )}
      {royalties?.length ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Track</Table.HeadCell>
            <Table.HeadCell>Period</Table.HeadCell>
            <Table.HeadCell>Payout</Table.HeadCell>
            <Table.HeadCell className="text-center" width={120}>
              Claim
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {royalties.map((data, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="flex items-center">
                    <Avatar alt="track image" img={data.track_image} rounded />
                    <div className="whitespace-nowrap ml-2">
                      <div>{data.track_name}</div>
                      <div className="text-gray-400 text-sm">
                        {data.owned_tokens} tokens
                      </div>
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <Moment format="MMMM YYYY">{data.period_start}</Moment> -{" "}
                  <Moment format="MMMM YYYY">{data.period_end}</Moment>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <Image
                      alt="EURe"
                      src={"/EURe.svg"}
                      width={20}
                      height={20}
                    />
                    <strong className="font-semibold pl-1">
                      {data.payout / 100}
                    </strong>
                  </div>
                </Table.Cell>
                <Table.Cell width={120}>
                  <div className="flex items-center justify-center">
                    {data.claimed ? (
                      <FaCircleCheck />
                    ) : (
                      <Button
                        className="bg-primary"
                        size="xs"
                        onClick={() => onClaimRoyalties(data, index)}
                        disabled={!authProvider}
                      >
                        <FaCoins size={16} />
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div>No royalties to claim yet!</div>
      )}
      {isPending && <PageLoader text={"Claiming..."} />}
    </>
  );
};

export default Royalties;
