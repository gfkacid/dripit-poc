import React from "react";
import { HashLoader } from "react-spinners";

const PageLoader = ({ className }) => {
  return (
    <div
      className={
        className ||
        "fixed top-0 left-0 w-full h-full flex justify-center items-center"
      }
    >
      <HashLoader color="#afeeda" size={80} />
    </div>
  );
};

export default PageLoader;
