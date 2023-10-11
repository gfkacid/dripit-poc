import React from "react";
import PreviewDrop from "@/components/drops/PreviewDrop";

import {
  selectArtistProfile,
  selectArtistTracks,
} from "@/store/artist/selectors";
import { useSelector } from "react-redux";

function Drops() {
  const tracks = useSelector(selectArtistTracks);
  const artist = useSelector(selectArtistProfile);

  return (
    <div className="border-t border-gray pt-10 mt-10">
      <h3 className="antialiased font-semibold">Drops</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-4">
        {tracks.map(({ drop, ...track }) => (
          <PreviewDrop
            key={drop.id}
            data={{
              ...drop,
              track: {
                ...track,
                artist,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Drops;
