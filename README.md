# Art Database API

## Overview
This project is a database-driven REST API built using **Node.js** and **Express**, integrated with **Supabase** for data retrieval. The API provides endpoints for querying paintings, artists, galleries, genres, eras, and aggregated counts, returning all data in JSON format.

## Built With
- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **Supabase** - Cloud-based PostgreSQL database
- **Render** - Hosting platform

## Project Files
| File | Description |
| :--- | :--- |
| `server.js` | Main entry point for the application; initializes Express, connects to Supabase, and mounts all route modules. |
| `routes/eras.js` | Handles requests for art history eras. |
| `routes/galleries.js` | Handles requests for galleries, specific gallery references, and country substring filters. |
| `routes/artists.js` | Handles requests for artists, artist references, last name searches, and nationality filters. |
| `routes/genres.js` | Handles requests for genres with era details, specific genre references, and painting genres. |
| `routes/paintings.js` | Handles sorting, filtering, limits, pagination skips, and relational painting queries. |
| `routes/counts.js` | Handles aggregated counts for genres, artists, and top genres by threshold. |

---

## API Endpoints Reference

| Endpoint Path | Description |
| :--- | :--- |
| `/api/eras` | Returns all art history eras. |
| `/api/galleries` | Returns all galleries. |
| `/api/galleries/:id` | Returns a specific gallery by ID. |
| `/api/galleries/country/:substring` | Returns galleries whose country starts with the given substring. |
| `/api/artists` | Returns all artists. |
| `/api/artists/:artistId` | Returns a specific artist by ID. |
| `/api/artists/search/:substring` | Returns artists whose last name starts with the given substring. |
| `/api/artists/country/:substring` | Returns artists whose nationality starts with the given substring. |
| `/api/genres` | Returns all genres with nested era details. |
| `/api/genres/:genreId` | Returns a specific genre with era details by ID. |
| `/api/genres/painting/:paintingId` | Returns all genres associated with a specific painting, sorted by name. |
| `/api/paintings/single/:paintingId` | Returns a single painting by ID with related details. |
| `/api/paintings/sort/:searchParam/limit/:limit` | Returns paintings sorted by `title` or `year` with a record limit. |
| `/api/paintings/sort/:searchParam/limit/:limit/skip/:skip` | Returns sorted and limited paintings with pagination skip offset. |
| `/api/paintings/search/:substring` | Returns paintings matching a title substring. |
| `/api/paintings/years/:start/:end` | Returns paintings created between a start and end year range. |
| `/api/paintings/galleries/:galleryId` | Returns paintings belonging to a specific gallery. |
| `/api/paintings/artist/:artistId` | Returns paintings created by a specific artist. |
| `/api/paintings/genre/:genreId` | Returns paintings associated with a specific genre. |
| `/api/paintings/era/:eraId` | Returns paintings associated with a specific art era. |
| `/api/counts/genres` | Returns genre painting counts sorted from fewest to most. |
| `/api/counts/artists` | Returns artist painting counts sorted from most to fewest. |
| `/api/counts/topgenres/:threshold` | Returns genres with a painting count exceeding the specified threshold. |

---

## Live Test Links
Base URL: `https://art-api-yz85.onrender.com`

### Eras & Galleries
- [GET /api/eras](https://art-api-yz85.onrender.com/api/eras)
- [GET /api/galleries](https://art-api-yz85.onrender.com/api/galleries)
- [GET /api/galleries/30](https://art-api-yz85.onrender.com/api/galleries/30) — Gallery by ID (30)
- [GET /api/galleries/calgary](https://art-api-yz85.onrender.com/api/galleries/calgary) — Error Test: Non-existent gallery, invalid parameter
- [GET /api/galleries/country/fra](https://art-api-yz85.onrender.com/api/galleries/country/fra) — Galleries by country substring (`fra`)

### Artists
- [GET /api/artists](https://art-api-yz85.onrender.com/api/artists)
- [GET /api/artists/12](https://art-api-yz85.onrender.com/api/artists/12) — Artist by ID (12)
- [GET /api/artists/1223423](https://art-api-yz85.onrender.com/api/artists/1223423) — Error Test: Non-existent artist ID
- [GET /api/artists/search/ma](https://art-api-yz85.onrender.com/api/artists/search/ma) — Search last name (`ma`)
- [GET /api/artists/search/mA](https://art-api-yz85.onrender.com/api/artists/search/mA) — Search last name case-insensitive (`mA`)
- [GET /api/artists/country/fra](https://art-api-yz85.onrender.com/api/artists/country/fra) — Artists by country (`fra`)

### Genres
- [GET /api/genres](https://art-api-yz85.onrender.com/api/genres) — All genres with eras
- [GET /api/genres/76](https://art-api-yz85.onrender.com/api/genres/76) — Genre by ID (76)
- [GET /api/genres/painting/408](https://art-api-yz85.onrender.com/api/genres/painting/408) — Genres for painting (408)
- [GET /api/genres/painting/jsdfhg](https://art-api-yz85.onrender.com/api/genres/painting/jsdfhg) — Error Test: Invalid painting ID

### Paintings
- [GET /api/paintings/single/63](https://art-api-yz85.onrender.com/api/paintings/single/63) — Single painting (63)
- [GET /api/paintings/sort/title/limit/10](https://art-api-yz85.onrender.com/api/paintings/sort/title/limit/10) — Sort by title, limit 10
- [GET /api/paintings/sort/year/limit/10](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10) — Sort by year, limit 10
- [GET /api/paintings/sort/absd/limit/10](https://art-api-yz85.onrender.com/api/paintings/sort/absd/limit/10) — Error Test: Invalid sort parameter (`absd`)
- [GET /api/paintings/sort/year/limit/asd](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/asd) — Error Test: Invalid limit parameter (`asd`)
- [GET /api/paintings/sort/year/limit](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit) — Error Test: Missing limit parameter
- [GET /api/paintings/sort/year/limit/10/skip/30](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10/skip/30) — Sort by year, limit 10, skip 30
- [GET /api/paintings/sort/year/limit/10/skip/30000](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10/skip/30000) — Error Test: Skip out of bounds
- [GET /api/paintings/sort/year/limit/10/skip](https://art-api-yz85.onrender.com/api/paintings/sort/year/limit/10/skip) — Error Test: Missing skip value
- [GET /api/paintings/search/port](https://art-api-yz85.onrender.com/api/paintings/search/port) — Search title substring (`port`)
- [GET /api/paintings/search/pORt](https://art-api-yz85.onrender.com/api/paintings/search/pORt) — Search title case-insensitive (`pORt`)
- [GET /api/paintings/search/connolly](https://art-api-yz85.onrender.com/api/paintings/search/connolly) — Error Test: Search not found
- [GET /api/paintings/years/1800/1850](https://art-api-yz85.onrender.com/api/paintings/years/1800/1850) — Paintings between years 1800-1850
- [GET /api/paintings/years/1850/1800](https://art-api-yz85.onrender.com/api/paintings/years/1850/1800) — Error Test: Start year after end year
- [GET /api/paintings/galleries/5](https://art-api-yz85.onrender.com/api/paintings/galleries/5) — Paintings by gallery (5)
- [GET /api/paintings/artist/16](https://art-api-yz85.onrender.com/api/paintings/artist/16) — Paintings by artist (16)
- [GET /api/paintings/genre/78](https://art-api-yz85.onrender.com/api/paintings/genre/78) — Paintings by genre (78)
- [GET /api/paintings/era/2](https://art-api-yz85.onrender.com/api/paintings/era/2) — Paintings by era (2)

### Counts & Aggregations
- [GET /api/counts/genres](https://art-api-yz85.onrender.com/api/counts/genres) — Genre painting counts (fewest to most)
- [GET /api/counts/artists](https://art-api-yz85.onrender.com/api/counts/artists) — Artist painting counts (most to fewest)
- [GET /api/counts/topgenres/20](https://art-api-yz85.onrender.com/api/counts/topgenres/20) — Top genres with > 20 paintings
- [GET /api/counts/topgenres/2034958](https://art-api-yz85.onrender.com/api/counts/topgenres/2034958) — Error Test: Threshold too high

