import React, {useContext, useEffect, useState} from "react";


export interface Sighting {
    //id: number;
    date: Date;
    //location: string;
    description: string;
    //species: string; //to check with sighting controller
    //photoUrl: string;
    //user: string; //to check with sighting controller
}

export async function fetchSightings(): Promise<Array<Sighting>> {
    // const response = await fetch(`https://localhost:5001/sightings`,  {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // });
    // return await response.json();
    return Promise.resolve(
        [
            {
                date: new Date(),
                description: "Sighting 1"
            },
            {
                date: new Date(),
                description: "Sighting 2"
            }
        ]
    )
}



export function SightingListPage(): JSX.Element {
    const [sightings, setSightings] = useState<Array<Sighting>>([]);
   
    useEffect(
        () => {
            fetchSightings().then(setSightings);
        },
        []
    );
    
    
    
    
    return (
        <>
            <h1 className="title">Sightings</h1>
            <ul>

                {sightings.map((s, i) =>
                    <li key={i}>
                        <p>{s.description}</p>
                        <p>{s.date.toDateString()}</p>
                    </li>
                )}
            </ul>
        </>
    );
}