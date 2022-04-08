import React, { useState } from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { ExternalApiSighting } from "../Sighting/ExternalApiSighting";
import { InternalSighting } from "../Sighting/InternalSighting";

export function SightingList({
  perPage,
  combinedSightingList,
  currentPage,
}: {
  perPage: number;
  combinedSightingList: (Sighting | ExternalSighting)[];
  currentPage: number;
}) {
  const isInternalSighting = (
    s: Sighting | ExternalSighting
  ): s is Sighting => {
    return (s as Sighting).approvedBy !== undefined;
  };

  const offset = currentPage * perPage;

  return (
    <>
      <ul className="list-group list-group-flush">
        {combinedSightingList
          .slice(offset, offset + perPage)
          .map((s, i) =>
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
