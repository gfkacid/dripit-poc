"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { FaEnvelope, FaAt } from "react-icons/fa6";
import PageLoader from "@/components/generic/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEoa,
  selectSelectedSafe,
  selectWeb3AuthPack,
} from "@/store/safe-global/selectors";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { registerUser } from "@/store/auth/actions";

import { GelatoRelayPack } from "@safe-global/relay-kit";
import { ethers } from "ethers";
import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { setSelectedSafe } from "@/store/safe-global/slice";
import { redirect } from "next/navigation";
import { selectUserRegistrationIsPending } from "@/store/auth/selectors";
import {
  loginUser,
  setAuthIsPending,
  setUserRegistrationIsPending,
} from "@/store/auth/slice";
import { setUserInfo } from "@/store/account/slice";
import _get from "lodash/get";

const Register = () => {
  const web3AuthPack = useSelector(selectWeb3AuthPack);
  const eoa = useSelector(selectEoa);
  const userRegistrationIsPending = useSelector(
    selectUserRegistrationIsPending
  );
  const selectedSafe = useSelector(selectSelectedSafe);
  const dispatch = useDispatch();
  const [registrationError, setRegistrationError] = useState(false);

  const predictSafeAddress = useCallback(
    async ({ signer, ethAdapter }) => {
      if (web3AuthPack) {
        const safeFactory = await SafeFactory.create({
          ethAdapter,
          contractNetworks: ["0x5"],
        });

        const safeAccountConfig = {
          owners: [await signer.getAddress()],
          threshold: 1,
        };

        const predictedSafeAddress = await safeFactory.predictSafeAddress(
          safeAccountConfig
        );

        return { predictedSafeAddress, safeAccountConfig };
      }
    },
    [web3AuthPack]
  );

  const deploySafeContract = useCallback(
    async ({ app_scoped_privkey }) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );

        const signer = new ethers.Wallet(app_scoped_privkey, provider);

        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: signer,
        });

        const { predictedSafeAddress, safeAccountConfig } =
          await predictSafeAddress({ signer, ethAdapter });

        const safeSDK = await Safe.create({
          ethAdapter,
          predictedSafe: { safeAccountConfig },
          contractNetworks: ["0x5"],
        });

        const relayKit = new GelatoRelayPack(
          process.env.NEXT_PUBLIC_GELATO_API_KEY
        );

        // Create a transactions array with one transaction object
        const transactions = [
          { to: predictedSafeAddress, data: "0x", value: 0 },
        ];
        const options = { isSponsored: true };

        const safeTransaction = await relayKit.createRelayedTransaction({
          safe: safeSDK,
          transactions,
          options,
        });

        const signedSafeTransaction = await safeSDK.signTransaction(
          safeTransaction
        );

        const response = await relayKit.executeRelayTransaction(
          signedSafeTransaction,
          safeSDK,
          options
        );

        return { predictedSafeAddress };
      } catch (error) {
        throw error;
      }
    },
    [predictSafeAddress]
  );

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setRegistrationError(false);

      if (!values.agree) {
        setSubmitting(false);
        return;
      }

      try {
        let safeAddress = null;

        const app_scoped_privkey = await web3AuthPack.getProvider()?.request({
          method: "eth_private_key", // use "private_key" for other non-evm chains
        });

        if (!selectedSafe) {
          const { predictedSafeAddress } = await deploySafeContract({
            app_scoped_privkey,
          });

          safeAddress = predictedSafeAddress;
        } else {
          safeAddress = selectedSafe;
        }

        const { agree, image, ...formValues } = values;

        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
        });

        if (image?.length) formData.append("image", image[0]);

        // Incase of secp256k1 curve, get the app_pub_key

        const app_pub_key = getPublicCompressed(
          Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")
        ).toString("hex");

        formData.append("app_pub_key", app_pub_key);
        formData.append("eoa", eoa);
        formData.append("safe", safeAddress);

        const res = await dispatch(registerUser(formData)).unwrap();

        dispatch(setSelectedSafe(safeAddress));

        redirect("/");
      } catch (error) {
        if (
          _get(error, "response.data.error", "")?.includes(
            "already registered"
          ) &&
          _get(error, "response.data.user")
        ) {
          const user = _get(error, "response.data.user");

          dispatch(loginUser(user?.idToken));
          dispatch(setUserInfo(user));
          dispatch(setAuthIsPending(false));
          dispatch(setUserRegistrationIsPending(false));
        } else {
          setRegistrationError(true);
        }
      }

      setSubmitting(false);
    },
    [deploySafeContract, dispatch, eoa, selectedSafe, web3AuthPack]
  );

  useEffect(() => {
    if (!userRegistrationIsPending) redirect("/");
  }, [userRegistrationIsPending]);

  return (
    <div
      className="container mx-auto px-8 flex flex-col items-center justify-center"
      style={{ minHeight: "90vh" }}
    >
      <h1 className="text-3xl font-bold mb-6">Create your account</h1>

      <Formik
        initialValues={{ email: "", username: "", agree: false, image: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.username) errors.username = "Required";
          if (!values.agree) errors.agree = "Required";

          return errors;
        }}
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
        }) => (
          <form
            className="flex max-w-md w-full flex-col gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="username" value="Your username" />
              </div>
              <TextInput
                id="username"
                placeholder="Enter your username"
                shadow
                type="text"
                icon={FaAt}
                onChange={handleChange}
                value={values.username}
                color={errors.username && touched.username ? "failure" : ""}
                helperText={
                  errors.username && touched.username ? errors.username : ""
                }
              />
            </div>
            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="Enter your email"
                shadow
                type="text"
                icon={FaEnvelope}
                onChange={handleChange}
                value={values.email}
                color={errors.email && touched.email ? "failure" : ""}
                helperText={errors.email && touched.email ? errors.email : ""}
              />
            </div>

            <div className="max-w-md" id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="image" value="Upload your avatar" />
              </div>
              <FileInput
                helperText="A profile picture is useful to confirm your are logged into your account"
                id="image"
                onChange={(event) => {
                  const files = event.target.files;
                  const myFiles = Array.from(files);

                  setFieldValue("image", myFiles);
                }}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                checked={values.agree}
                onChange={handleChange}
                id="agree"
              />
              <Label className="flex" htmlFor="agree">
                <p>I agree with the</p>
                <a className="hover:underline ml-1" href="/">
                  <p>terms and conditions</p>
                </a>
              </Label>
            </div>

            <Button
              size="lg"
              className="bg-primary mt-4"
              type="submit"
              disabled={isSubmitting || !web3AuthPack}
            >
              Register new account
            </Button>

            {registrationError ? (
              <div className="text-red text-sm mt-2 font-medium">
                Oops something went wrong while submitting the form! Please try
                again later.
              </div>
            ) : null}

            {isSubmitting && <PageLoader text="Deploying Safe" />}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
