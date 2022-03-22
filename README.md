# Whale Spotting

Welcome to Whale Spotting! Whale Spotting is a React frontend and C# ASP.NET backend application.

Recently we have finally seen an increase in whale numbers across the globe due to conservation efforts, and we would love to keep the public and scientific community engaged with these efforts. We have been tasked with creating a new website to help encourage and track whale spotting. Inspired by the Washington Whale Museum who have been tracking whale sightings in the Salish Sea but has recently been getting less traffic, we have been hired to create a new website that integrates with their API to grab their current sightings data and expand it to cover the whole world!

## Project setup

Install the dependencies for the backend (in the `backend` folder) with:
```
dotnet restore
```
and in the frontend (in the `frontend` folder) with:
```
npm install
```
(if you get an error that mentions lockfile versions, upgrade npm with `npm install -g npm`)

See the below instructions for running the database - the first time you run it will download the official PostgreSQL Docker image and set up the database for the first time, which takes a little while!

## Project structure

The project consists of three separate services: the **database**, running inside a Docker container; the **API**, a C# ASP.NET app; and the **frontend**, a React single-page application.

The database runs through `docker-compose` in a Docker container with a persistent storage volume.

The backend is an ASP.NET web API, and exposes a set of API endpoints to be used by the frontent.

The frontend is written in Typescript React, using [React Router](https://reactrouter.com/) for routing and [Bulma](https://bulma.io/) for styling.

## Running the project locally

To run the project locally, we need to start all three services separately (preferably in the following order).

### Running the database

The configuration for our database is in `docker-compose.yaml` and `database.env`. We use a program called `docker-compose` to co-ordinate a PostgreSQL instance running in a Docker container, and persist its data between starts of the container (meaning you can turn your computer off and the database will still have all the data in it when you start the container back up!)

Make sure you have Docker installed and that the Docker daemon is running (by launching the Docker Desktop program) and start the database running (in the repository root, the same folder that this README is in) with
```
docker-compose up
```
This will take a long time if it's your first time running the container!

You can then connect to the database using [pgAdmin](https://www.pgadmin.org/) with the following details:

| Field         | Value             |
| ------------- | ----------------- |
| Host          | `localhost`       |
| Port          | `5400`            |
| Username      | `whale-spotting`  |
| Password      | `spot-whales`     |
| Database name | `whale-spotting`  |

To tear down the container, press Ctrl+C in the command line (or, if you ran the container in detached mode with `docker-compose up -d`, run `docker-compose down`).

`docker-compose down --volumes` deletes the storage if you ever want to start from an empty database!

### Running the backend

First, set the required environment variables for connecting to the database.

For local running in powershell, run:
```
$env:DATABASE_URL = "postgres://whale-spotting:spot-whales@localhost:5400/whale-spotting"
$env:USE_SSL = "false"
```

Navigate to the `backend` folder and run:

```
dotnet watch run
```

It will run a file watcher and update when files are changed. Stop it with Ctrl+C.

### Running the frontend

Navigate to the `frontend` folder and run:

```
npm start
```

It will run a file watcher and update when files are changed. Stop it with Ctrl+C.
