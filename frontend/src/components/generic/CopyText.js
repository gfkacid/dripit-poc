import React, { useState } from "react";
import { FaCopy } from "react-icons/fa6";

const CopyText = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(text);
    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, [1000]);
  };

  return (
    <span className="ml-2 inline-flex items-center relative" onClick={onClick}>
      <FaCopy size={16} className="text-gray" />

      {showTooltip && (
        <span
          className="absolute bg-black text-white px-2 py-1 text-xs rounded mr-1"
          style={{ top: "-0.25rem", right: "100%" }}
        >
          Copied!
        </span>
      )}
    </span>
  );
};

export default CopyText;
