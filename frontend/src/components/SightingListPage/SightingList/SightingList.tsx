import React from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { ExternalApiSighting } from "../Sighting/ExternalApiSighting";
import { InternalSighting } from "../Sighting/InternalSighting";

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
              sighting={s}
              confirmWhaleSighting={confirmWhaleSighting}
              deleteWhaleSighting={deleteWhaleSighting}
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
