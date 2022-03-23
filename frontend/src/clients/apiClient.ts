export async function fetchLocations() {
    const response = await fetch(`https://localhost:5001/locations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        
        },
        // body: JSON.stringify(searchTerm),
    });
   
    if (!response.ok) {
        throw new Error(await response.json())
    }

    return await response.json();
}