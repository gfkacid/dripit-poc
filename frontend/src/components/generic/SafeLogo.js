import React from "react";
import Image from "next/image";

const SafeLogo = () => {
  return (
    <Image
      alt="safe"
      src={"/safe_icon.jpeg"}
      style={{ display: "inline-block", borderRadius: "50%" }}
      width={20}
      height={20}
    />
  );
};

export default SafeLogo;
