import React, { useCallback, useEffect, useState } from "react";

import PageLoader from "@/components/generic/PageLoader";
import { Formik } from "formik";
import { Modal, Button, TextInput, Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDropArtist,
  selectDropProfile,
  selectDropTrack,
} from "@/store/drop/selectors";
import { displayPrice, retryRevolveTaskStatus } from "@/utils/functions";
import _get from "lodash/get";
import TopUpWalletAlert from "@/components/generic/TopUpWalletAlert";
import { selectAccountBalance } from "@/store/account/selectors";
import {
  selectAuthProvider,
  selectSelectedSafe,
} from "@/store/safe-global/selectors";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { buyDropTokens, getDrop } from "@/store/drop/actions";
import { useParams } from "next/navigation";
import { ethers } from "ethers";

import dropABI from "@/utils/blockchain/drop_abi.json";

const BuyTokens = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionError, setTransactionError] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [maxTokens, setMaxTokens] = useState(1);

  const drop = useSelector(selectDropProfile);
  const track = useSelector(selectDropTrack);
  const artist = useSelector(selectDropArtist);
  const accountBalance = useSelector(selectAccountBalance);
  const authProvider = useSelector(selectAuthProvider);
  const selectedSafe = useSelector(selectSelectedSafe);
  const dispatch = useDispatch();
  const { slug } = useParams();

  const revolveTaskStatus = async (taskId, relayKit) => {
    const res = await relayKit.getTaskStatus(taskId);

    if (res.taskState !== "ExecSuccess") {
      throw new Error("Status not resolved");
    }

    return res;
  };

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      if (!values.tokens) {
        setSubmitting(false);
        return;
      }

      try {
        setTransactionError(false);
        setTransactionPending(true);

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
        const relayKit = new GelatoRelayPack(
          process.env.NEXT_PUBLIC_GELATO_API_KEY
        );

        const contract = new ethers.Contract(drop.contract, dropABI, safeOwner);

        // Encode the parameters
        const data = contract.interface.encodeFunctionData(
          "mint(uint256,address)",
          [values.tokens, selectedSafe]
        );
        const transactions = [{ to: drop.contract, data: data, value: 0 }];
        const options = { isSponsored: true };

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

        await retryRevolveTaskStatus(
          () => revolveTaskStatus(response.taskId, relayKit),
          5000,
          20
        );

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const tokens = await contract.walletOfOwner(selectedSafe);
        const params = {
          token_ids: tokens.map((bn) => bn.toNumber()),
          drop_id: drop?.id,
        };

        await dispatch(buyDropTokens(params)).unwrap();

        if (slug) dispatch(getDrop({ slug }));

        setSubmitting(false);
        setTransactionSuccess(true);
        setTransactionPending(false);
      } catch (error) {
        console.error(error);
        setTransactionError(true);
      }

      setTransactionPending(false);
      setSubmitting(false);
    },
    [authProvider, dispatch, drop.contract, drop?.id, selectedSafe, slug]
  );

  const hasSufficientBalance = (total) => {
    const balance = parseFloat(accountBalance);

    return balance && balance >= parseFloat(total / 100);
  };

  useEffect(() => {
    if (isModalOpen) setMaxTokens(drop?.supply <= 5 ? drop?.supply : 5);
  }, [isModalOpen, drop?.supply]);

  return (
    <>
      <Button
        color="primary"
        className="bg-primary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
      >
        Buy Now
      </Button>

      <Modal
        show={isModalOpen}
        size="lg"
        popup
        onClose={() => (!transactionPending ? setIsModalOpen(false) : {})}
      >
        <Modal.Header
          as="div"
          theme={{
            title: "text-xl dark:text-white px-2 font-bold",
          }}
        >
          {_get(track, "name", "")} - {_get(artist, "name", "")}
        </Modal.Header>
        <Modal.Body className="pt-6 border-t">
          <Formik
            initialValues={{ tokens: 1, total: drop?.price }}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) =>
              transactionSuccess ? (
                <Alert className="mb-3" color="success">
                  <p className="font-medium">
                    Successfully minted{" "}
                    <strong>{_get(track, "name", "")}</strong> token
                    {values.tokens > 1 ? "s" : ""}.
                  </p>
                </Alert>
              ) : (
                <form
                  className="flex max-w-md w-full flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  {!hasSufficientBalance(values.total) ? (
                    <TopUpWalletAlert />
                  ) : null}

                  {transactionError && (
                    <Alert
                      className="mb-3"
                      color="failure"
                      onDismiss={() => setTransactionError(false)}
                    >
                      <p className="font-medium">
                        Failed to process your transaction at this moment.
                        Please try again later.
                      </p>
                    </Alert>
                  )}

                  <div className="flex flex-col justify-center items-center border-b pb-6">
                    <div className="font-semibold text-xl font-mono">
                      € {displayPrice(drop?.price)}
                    </div>
                    <div className="text-sm text-gray">price per token</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 font-semibold">
                    <div>Tokens</div>
                    <div className="flex justify-end">
                      <TextInput
                        size="sm"
                        id="tokens"
                        type="number"
                        min={0}
                        max={maxTokens}
                        step="1"
                        onChange={(e) => {
                          if (
                            (e.target.value > 0 &&
                              e.target.value <= maxTokens) ||
                            e.target.value === ""
                          ) {
                            handleChange(e);
                            setFieldValue(
                              "total",
                              e.target.value
                                ? +e.target.value * +drop?.price
                                : 0
                            );
                          }
                        }}
                        value={values.tokens}
                        color={errors.tokens && touched.tokens ? "failure" : ""}
                        helperText={
                          errors.tokens && touched.tokens ? errors.tokens : ""
                        }
                        className="text-right number-input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 font-semibold">
                    <div>Total</div>
                    <div className="font-bold font-mono text-right">
                      € {displayPrice(values.total)}
                    </div>
                  </div>

                  <Button
                    className="bg-primary mt-4"
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !hasSufficientBalance(values.total) ||
                      !authProvider
                    }
                  >
                    Continue
                  </Button>

                  {isSubmitting && (
                    <PageLoader text="Transaction in progress" />
                  )}
                </form>
              )
            }
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuyTokens;
