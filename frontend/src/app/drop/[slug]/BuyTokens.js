import React, { useCallback, useEffect, useState } from "react";

import PageLoader from "@/components/generic/PageLoader";
import { Formik } from "formik";
import {
  Modal,
  Button,
  Checkbox,
  Label,
  TextInput,
  FileInput,
} from "flowbite-react";
import useSafeMoneriumPack from "@/utils/hooks/useSafeMoneriumPack";
import { useSelector } from "react-redux";
import {
  selectDropArtist,
  selectDropProfile,
  selectDropTrack,
} from "@/store/drop/selectors";
import { displayPrice } from "@/utils/functions";
import _get from "lodash/get";

const BuyTokens = () => {
  // const { moneriumPack, startMoneriumFlow } = useSafeMoneriumPack();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const drop = useSelector(selectDropProfile);
  const track = useSelector(selectDropTrack);
  const artist = useSelector(selectDropArtist);

  // const [sessionData, setSessionData] = useState(null);

  // useEffect(() => {
  //   if (isModalOpen && moneriumPack) startMoneriumFlow();
  //   else setSessionData(null);
  // }, [isModalOpen, moneriumPack, startMoneriumFlow]);

  // if (!moneriumPack) return null;

  const handleSubmit = useCallback(() => {}, []);

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
        onClose={() => setIsModalOpen(false)}
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
          <Formik initialValues={{ tokens: "" }} onSubmit={handleSubmit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                className="flex max-w-md w-full flex-col gap-4"
                onSubmit={handleSubmit}
              >
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
                      max={3}
                      step="1"
                      onChange={(e) => {
                        if (
                          (e.target.value > 0 && e.target.value <= 3) ||
                          e.target.value === ""
                        )
                          handleChange(e);
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
                    €{" "}
                    {displayPrice(
                      values?.tokens ? +values.tokens * +drop?.price : 0
                    )}
                  </div>
                </div>

                <Button
                  className="bg-primary mt-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Continue
                </Button>

                {isSubmitting && <PageLoader />}
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuyTokens;
