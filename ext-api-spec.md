# The Tim Leach Whale Spotting Worker's Co-operative Open API

## Endpoints

### Sightings

#### `GET /sightings`

Get all the sightings:

```
{
  sightings:  Sighting[]  // list of "Sighting" objects (defined below)
}
```

#### `GET /sightings/<id>`

Information about a single sighting:

```
{
  id:       number,
  date:     string,
  location: Location,   // the location of the sighting (Location object, defined below)
  species:  Species[]?, // optional list of "Species" objects (defined below) (not given if unknown)
  photoUrl: string?,    // URL of a photo of the sighting
  email:    string?     // email address of the person who submitted the sighting
}
```

### Species

#### `GET /species`

A list of all the species in the database:

```
{
  species: Species[]  // list of "Species" objects (defined below)
}
```

#### `GET /species/<id>`

Gets a specific species:

```
{
  id:               number,
  name:             string,
  latinName:        string,
  photoUrl:         string?,
  description:      string?,
  endangeredStatus: string,
  sightings:        Sighting[]  // a list of all the sightings of this species (those Sighting objects do NOT include the species field)
}
```

#### `GET /species/search?name="string"&latinName="string"`

Gets a specific species, searching by name or latin name (does case-insensitive substring matching):

```
{
  id,               number,
  name:             string,
  latinName:        string,
  photoUrl:         string?,
  description:      string?,
  endangeredStatus: string,
  sightings:        Sighting[]  // a list of all the sightings of this species (those Sighting objects do NOT include the species field)
}
```

### Locations

#### `GET /locations`

Get all the locations:

```
{
  items: Location[],  // list of "Location" objects (defined below)
}
```

#### `GET /locations/<id>`

Returns a specific location:

```
{
  id:           number,
  latitude:     number,     // ranges fron -90.0 to 90.0
  longitude:    number,     // ranges from -180.0 to 180.0
  name:         string?,    // the common name of the location (if it has one!)
  description:  string?,
  sightings:    Sightings[] // a list of all sightings at this location (those Sighting objects do NOT include the location field)
}
```

#### `GET /locations/search?latitude="number"&longitude="number"`

Returns the location in the database closest to the provided latitude (-90.0 to 90.0) and longitude (-180.0 to 180.0):

```
{
  id:           number,
  latitude:     string,
  longitude:    string,
  name:         string?,    // the common name of the location (if it has one!)
  description:  string?,
  sightings:    Sightings[] // a list of all sightings at this location (those Sighting objects do NOT include the location field)
}
```
