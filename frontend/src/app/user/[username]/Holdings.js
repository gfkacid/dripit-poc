import React from "react";
import { useSelector } from "react-redux";
import _get from "lodash/get";
import PreviewDrop from "@/components/drops/PreviewDrop";
import { selectUserNftsOwned } from "@/store/user/selectors";

const Holdings = () => {
  const nftsOwned = useSelector(selectUserNftsOwned);

  return (
    <div className="border-t border-gray pt-10 mt-10">
      <h3 className="antialiased font-semibold">Holdings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-4">
        {nftsOwned.map((data) => (
          <PreviewDrop key={data.id} data={data.drop} />
        ))}
      </div>
    </div>
  );
};

export default Holdings;
