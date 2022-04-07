import React from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { ExternalApiSighting } from "../Sighting/ExternalApiSighting";
import { InternalSighting } from "../Sighting/InternalSighting";

export function SightingList({
  setCombinedSightingList,
  combinedSightingList,
}: {
  setCombinedSightingList: React.Dispatch<
    React.SetStateAction<(Sighting | ExternalSighting)[]>
  >;
  combinedSightingList: (Sighting | ExternalSighting)[];
}) {
  const isInternalSighting = (
    s: Sighting | ExternalSighting
  ): s is Sighting => {
    return (s as Sighting).approvedBy !== undefined;
  };

  return (
    <>
      <ul className="list-group list-group-flush">
        {combinedSightingList.map((s, i) =>
          isInternalSighting(s) ? (
            <InternalSighting
              setCombinedSightingList={setCombinedSightingList}
              sighting={s}
              index={i}
            />
          ) : (
            <ExternalApiSighting sighting={s} index={i} />
          )
        )}
      </ul>
    </>
  );
}