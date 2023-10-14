"use client";

import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { FaEnvelope, FaAt } from "react-icons/fa6";
import PageLoader from "@/components/generic/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { selectEoa, selectWeb3AuthPack } from "@/store/safe-global/selectors";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { registerUser } from "@/store/auth/actions";

const Register = () => {
  const web3AuthPack = useSelector(selectWeb3AuthPack);
  const eoa = useSelector(selectEoa);
  const dispatch = useDispatch();
  const [registrationError, setRegistrationError] = useState(false);

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setRegistrationError(false);

      if (!values.agree) {
        setSubmitting(false);
        return;
      }

      try {
        const { agree, image, ...formValues } = values;

        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
        });

        if (image?.length) formData.append("image", image[0]);

        // Incase of secp256k1 curve, get the app_pub_key
        const app_scoped_privkey = await web3AuthPack.getProvider()?.request({
          method: "eth_private_key", // use "private_key" for other non-evm chains
        });
        const app_pub_key = getPublicCompressed(
          Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")
        ).toString("hex");

        formData.append("app_pub_key", app_pub_key);
        formData.append("eoa", eoa);

        const res = await dispatch(registerUser(formData)).unwrap();

        console.log("res", res);
      } catch (error) {
        console.log("error", error);
        setRegistrationError(true);
      }

      setSubmitting(false);
    },
    [dispatch, eoa, web3AuthPack]
  );

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
            enctype="multipart/form-data"
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

            {isSubmitting && <PageLoader />}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
