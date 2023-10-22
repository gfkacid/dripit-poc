import React from "react";
import { HashLoader } from "react-spinners";

const PageLoader = ({ className, text }) => {
  return (
    <div
      className={
        className ||
        "fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center"
      }
    >
      <HashLoader color="#afeeda" size={80} />
      {text ? <div className="mt-3 text-sm font-semibold">{text}</div> : ""}
    </div>
  );
};

export default PageLoader;
