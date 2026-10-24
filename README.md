# Art Database API

## Overview
This project is a database-driven REST API built using **Node.js** and **Express**, integrated with **Supabase** for data retrieval. The API provides endpoints for querying paintings, artists, galleries, genres, eras, and aggregated counts, returning all data in JSON format.

## Built With
* **Node.js** - JavaScript runtime environment
* **Express** - Web framework for Node.js
* **Supabase** - Cloud-based PostgreSQL database
* **Render** - Hosting platform

## Project Files
| File | Description |
| :--- | :--- |
| `server.js` | Main entry point for the application; initializes Express, connects to Supabase, and mounts all route modules. |
| `routes/eras.js` | Handles requests for art history eras. |
| `routes/galleries.js` | Handles requests for galleries, specific gallery references, and country substring filters. |
| `routes/artists.js` | Handles requests for artists, artist references, last name searches, and nationality filters. |
| `routes/genres.js` | Handles requests for genres with era details, specific genre references, and painting genres. |
| `routes/paintings.js` | Handles complex sorting, filtering, limits, pagination skips, and relational painting queries. |
| `routes/counts.js` | Handles aggregated counts for genres, artists, and top genres by threshold. |

## API Endpoints & Test Links
https://art-api-yz85.onrender.com/

### Eras & Galleries
* [Get all eras](https://art-api-yz85.onrender.com/api/eras)
* [Get all galleries](https://art-api-yz85.onrender.com/api/galleries)
* [Get gallery by ID (30)](https://art-api-yz85.onrender.com/api/galleries/30)
* [Error Test: Non-existent gallery](https://art-api-yz85.onrender.com/api/galleries/calgary)
* [Get galleries by country substring (fra)](https://art-api-yz85.onrender.com/api/galleries/country/fra)

### Artists
* [Get all artists](https://art-api-yz85.onrender.com/api/artists)
* [Get artist by ID (12)](https://art-api-yz85.onrender.com/api/artists/12)
* [Error Test: Non-existent artist ID](https://art-api-yz85.onrender.com/api/artists/1223423)
* [Search artists by last name (ma)](https://art-api-yz85.onrender.com/api/artists/search/ma)
* [Search artists case-insensitive (mA)](https://art-api-yz85.onrender.com/api/artists/search/mA)
* [Get artists by country (fra)](https://art-api-yz85.onrender.com/api/artists/country/fra)

### Genres
* [Get all genres with eras](https://art-api-yz85.onrender.com/api/genres)
* [Get genre by ID (76)](https://art-api-yz85.onrender.com/api/genres/76)
* [Get genres for painting (408)](https://art-api-yz85.onrender.com/api/genres/painting/408)
* [Error Test: Invalid painting ID for genres](https://art-api-yz85.onrender.com/api/genres/painting/jsdfhg)

### Paintings
* [Get single painting (63)](https://art-api-yz85.onrender.com/api/paintings/single/63)
* [Sort paintings by title with limit 10](https://art-api-yz85.onrender.com/api/paintings/sort/title/limit/10)
* [Sort paintings by year with limit 10](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10)
* [Error Test: Invalid sort parameter](https://art-api-yz85.onrender.com/api/paintings/sort/absd/limit/10)
* [Error Test: Invalid limit parameter](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/asd)
* [Error Test: Missing limit parameter](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit)
* [Sort by year, limit 10, skip 30](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10/skip/30)
* [Error Test: Skip out of bounds](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10/skip/30000)
* [Error Test: Missing skip value](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10/skip)
* [Search paintings by title substring (port)](https://art-api-yz85.onrender.com/api/paintings/search/port)
* [Search paintings case-insensitive (pORt)](https://art-api-yz85.onrender.com/api/paintings/search/pORt)
* [Error Test: Search not found](https://art-api-yz85.onrender.com/api/paintings/search/connolly)
* [Get paintings between years 1800-1850](https://art-api-yz85.onrender.com/api/paintings/years/1800/1850)
* [Error Test: Start year after end year](https://art-api-yz85.onrender.com/api/paintings/years/1850/1800)
* [Get paintings by gallery (5)](https://art-api-yz85.onrender.com/api/paintings/galleries/5)
* [Get paintings by artist (16)](https://art-api-yz85.onrender.com/api/paintings/artist/16)
* [Get paintings by genre (78)](https://art-api-yz85.onrender.com/api/paintings/genre/78)
* [Get paintings by era (2)](https://art-api-yz85.onrender.com/api/paintings/era/2)

### Counts & Aggregations
* [Get genre counts (fewest to most)](https://art-api-yz85.onrender.com/api/counts/genres)
* [Get artist painting counts (most to fewest)](https://art-api-yz85.onrender.com/api/counts/artists)
* [Get top genres with > 20 paintings](https://art-api-yz85.onrender.com/api/counts/topgenres/20)
* [Error Test: Threshold too high for top genres](https://art-api-yz85.onrender.com/api/counts/topgenres/2034958)

