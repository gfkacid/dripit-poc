import React from "react";

const BorderedBox = ({ children, height = "h-32" }) => (
  <div
    className={`${height} flex flex-col rounded-lg border border-gray-300 flex items-center justify-center`}
  >
    {children}
  </div>
);

export default BorderedBox;
