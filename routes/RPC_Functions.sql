-- Below are the RPC queries used for genres.js

--Genres used in a painting
select g."genreID", g."genreName", g."description", g."wikiLink", row_to_json(e) as eras
from genres g
join paintinggenres pg on g."genreID" = pg."genreId"
join eras e on g."eraID" = e."eraId"
where pg."paintingId" = painting_id
order by g."genreName" asc;

-- Below are the RPC queries used for paintings.js

-- Paintings by genre sorted by year
select p."paintingId", p.title, p."yearOfWork", row_to_json(a) as artists, row_to_json(gal) as galleries
from paintings p
join paintinggenres pg on p."paintingId" = pg."paintingId"
join artists a on p."artistId" = a."artistId"
join galleries gal on p."galleryId" = gal."galleryId"
where pg."genreId" = genre_id
order by p."yearOfWork" asc;

-- Painting by era sorted by year
select p."paintingId", p.title, p."yearOfWork", row_to_json(a) as artists, row_to_json(gal) as galleries
FROM paintings p
join paintinggenres pg on p."paintingId" = pg."paintingId"
join genres g on pg."genreId" = g."genreId"
join artists a on p."artistId" = a."artistId"
join galleries gal on p."galleryId" = gal."galleryId"
where g."eraId" = era_id
order by "yearOfWork" asc;


-- Below are the RPC queries used for counts.js

-- Genre counts sorted fewest to most
select g."genreName", count(pg."paintingId") as count
from genres g
join paintinggenres pg on g."genreID" = pg."genreId"
group by g."genreName"
order by count asc;

-- Artist painting counts sorted most to fewest
select (a."firstName" || ' ' || a."lastName") as artist, count(p."paintingId") as count
from artists a
join paintings p on a."artistId" = p."artistID"
group by a."artistId", a."firstName", a."lastName"
order by count desc;

-- Top genres exceeding a threshold sorted most to fewest
select g."genreName", count(pg."paintingId") as count
from genres g
join paintinggenres pg on g."genreID" = pg."genreId"
group by g."genreName"
having count(pg."paintingId") > threshold
order by count desc;