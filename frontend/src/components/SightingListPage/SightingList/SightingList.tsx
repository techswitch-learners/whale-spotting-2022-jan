import React from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { ExternalApiSighting } from "../sighting/ExternalApiSighting";
import { InternalSighting } from "../sighting/InternalSighting";

export function SightingList({
  combined,
  confirmWhaleSighting,
  deleteWhaleSighting,
}: {
  combined: (Sighting | ExternalSighting)[];
  confirmWhaleSighting: (sightingId: number) => void;
  deleteWhaleSighting: (sightingId: number) => void;
}) {
  const isInternalSighting = (
    s: Sighting | ExternalSighting
  ): s is Sighting => {
    return (s as Sighting).approvedBy !== undefined;
  };

  return (
    <>
      <ul className="list-group list-group-flush">
        {combined.map((s, i) =>
          isInternalSighting(s) ? (
            <InternalSighting
              s={s}
              confirmWhaleSighting={confirmWhaleSighting}
              deleteWhaleSighting={deleteWhaleSighting}
              i={i}
            />
          ) : (
            <ExternalApiSighting s={s} i={i} />
          )
        )}
      </ul>
    </>
  );
}
