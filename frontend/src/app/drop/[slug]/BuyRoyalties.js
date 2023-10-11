import React, { useCallback, useEffect, useState } from "react";

import { Modal, Button } from "flowbite-react";
import PageLoader from "@/components/generic/PageLoader";
import useSafeMoneriumPack from "@/utils/hooks/useSafeMoneriumPack";

const BuyRoyalties = () => {
  const { moneriumPack, startMoneriumFlow } = useSafeMoneriumPack();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [sessionData, setSessionData] = useState(null);

  // useEffect(() => {
  //   if (isModalOpen && moneriumPack) startMoneriumFlow();
  //   else setSessionData(null);
  // }, [isModalOpen, moneriumPack, startMoneriumFlow]);

  if (!moneriumPack) return null;

  return (
    <>
      <Button
        color="primary"
        className="bg-primary"
        size="sm"
        onClick={() => startMoneriumFlow()}
      >
        Buy Now
      </Button>

      {/* <Modal
        show={isModalOpen}
        size="lg"
        popup
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header className="px-5">Buy Royalties</Modal.Header>
        <Modal.Body
          style={{ minHeight: "10rem" }}
          className={!sessionData ? "flex flex-col justify-center" : "pb-2"}
        >
          <div id="stripe-root"></div>
          {!sessionData ? (
            <PageLoader className={"flex justify-center items-center"} />
          ) : null}
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default BuyRoyalties;
