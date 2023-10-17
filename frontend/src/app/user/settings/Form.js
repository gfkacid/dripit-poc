import React from "react";
import { Formik } from "formik";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import PageLoader from "@/components/generic/PageLoader";
import { FaEnvelope, FaAt } from "react-icons/fa6";

const Form = () => {
  const handleSubmit = () => {};

  return (
    <div className="flex justify-center pt-6">
      <Formik
        initialValues={{ email: "", image: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

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

            <Button
              size="lg"
              className="bg-primary mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </Button>

            {/* {registrationError ? (
              <div className="text-red text-sm mt-2 font-medium">
                Oops something went wrong while submitting the form! Please try
                again later.
              </div>
            ) : null} */}

            {isSubmitting && <PageLoader />}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
