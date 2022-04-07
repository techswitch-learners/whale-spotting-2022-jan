import React from "react";
import { ExternalSighting, Sighting } from "../../../clients/apiClients";
import { ExternalApiSighting } from "../Sighting/ExternalApiSighting";
import { InternalSighting } from "../Sighting/InternalSighting";

export function SightingList({
  setSightings,
  combined,
}: {
  setSightings: React.Dispatch<React.SetStateAction<Sighting[]>>;
  combined: (Sighting | ExternalSighting)[];
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
              setSightings={setSightings}
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
