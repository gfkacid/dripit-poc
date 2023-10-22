import CopyText from "@/components/generic/CopyText";
import { selectAppScopedPrivkey } from "@/store/safe-global/selectors";
import { Badge, Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ExportPrivateKey = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appScopedPrivkey = useSelector(selectAppScopedPrivkey);

  if (!appScopedPrivkey) return null;

  return (
    <>
      <Button
        className="bg-primary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
      >
        Export Private Key
      </Button>

      <Modal
        show={isModalOpen}
        size="xl"
        popup
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header
          as="div"
          theme={{ title: "text-xl dark:text-white px-2 font-bold" }}
        >
          Export private key
        </Modal.Header>
        <Modal.Body className="pt-6 border-t flex items-center px-2 flex-nowrap overflow-hidden">
          <Badge
            className="flex-1 mr-1 text-center truncate inline-block"
            color="gray"
          >
            {appScopedPrivkey}
          </Badge>
          <CopyText text={appScopedPrivkey} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExportPrivateKey;
