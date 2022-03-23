/* export interface Species {
    id: number;
    name: string;
    latinName: string;
    photoUrl: string;
    description: string;
    endangeredStatus: string;
} */

/* function getAuthorizationHeader(username: string, password: string)
{
    return `Basic ${btoa(`${username}:${password}`)}`
} */

export async function fetchSpecies(){
    const response = await fetch(`https://whale-spotting-external-api.herokuapp.com/api/species`);
    const responseJson =  await response.json();
    return responseJson.species;
}