import React from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { ExternalApiSighting } from "../Sighting/ExternalApiSighting";
import { InternalSighting } from "../Sighting/InternalSighting";

export function SightingList({
  combinedSightingList,
}: {
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
            <InternalSighting sighting={s} index={i} />
          ) : (
            <ExternalApiSighting sighting={s} index={i} />
          )
        )}
      </ul>
    </>
  );
}
