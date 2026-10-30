/*
File: paintings.js
Description: API routes for retrieving paintings, sorted subsets, paginated windows, 
searches, year ranges, and relations by gallery, artist, genre, and era.
*/

const handlePaintings = (app, supabase) =>{
    
    /*
     GET /api/paintings
     Returns all paintings.
    */
    app.get('/api/paintings', async (req, res) => {

        const {data, error} = await supabase
            .from('paintings')
            .select();
        
        if (error) {

            return res.status(400).json({ error: error.message });

        }

        res.send(data);
    });

    /*
     GET /api/paintings/single/:paintingId
     Returns just the specified painting.
    */
    app.get('/api/paintings/single/:paintingId', async (req, res) => {

        const paintingId = parseInt(req.params.paintingId);

        if (isNaN(paintingId)) {

            return res.status(400).json({ error: "Invalid painting ID" });

        }

        const {data, error} = await supabase
            .from('paintings')
            .select()
            .eq('paintingId', paintingId);

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `Painting with ID: ${paintingId} not found` });
            
        }

        res.send(data);
    });

    // Fallback for missing limit value
    app.get('/api/paintings/sort/:sort/limit', (req, res) => {

        return res.status(400).json({ error: "Missing limit parameter" });
    });


    // Fallback for missing skip value
    app.get('/api/paintings/sort/:sort/limit/:limit/skip', (req, res) => {

        return res.status(400).json({ error: "Missing skip parameter" });

    });

    /*
     GET /api/paintings/sort/:searchParam/limit/:limit
     Returns paintings sorted by title or yearOfWork, with limit.
    */
    app.get('/api/paintings/sort/:searchParam/limit/:limit', async (req, res) => {

        const searchParam = req.params.searchParam.toLowerCase();
        const limit = parseInt(req.params.limit);

        if (isNaN(limit)) {

            return res.status(400).json({ error: "Limit must be a number" });

        }

        let sortColumn = '';

        if (searchParam === 'title') {

            sortColumn = 'title';

        } else if (searchParam === 'year') {

            sortColumn = 'yearOfWork';

        } else {

            return res.status(400).json({ error: `Invalid sort parameter: '${searchParam}' Use 'title' or 'year'` });

        }

        if (limit > 0) {

            const { data, error } = await supabase
                .from('paintings')
                .select('*, artists(*), galleries(*)')
                .order(sortColumn, { ascending: true })
                .limit(limit);

            if (error) {

                return res.status(400).json({ error: error.message });

            }

            return res.send(data);

        } else {

            const { data, error } = await supabase
                .from('paintings')
                .select('*, artists(*), galleries(*)')
                .order(sortColumn, { ascending: true });

            if (error) {

                return res.status(400).json({ error: error.message });

            }

            return res.send(data);
        }
    });

    /*
     GET /api/paintings/sort/:searchParam/limit/:limit/skip/:skip
     Returns paintings sorted by title or yearOfWork with a specified limit and skip offset.
    */
    app.get('/api/paintings/sort/:searchParam/limit/:limit/skip/:skip', async (req, res) => {

        const searchParam = req.params.searchParam.toLowerCase();
        const limit = parseInt(req.params.limit);
        const skip = parseInt(req.params.skip);

        if (isNaN(limit) || isNaN(skip)) {

            return res.status(400).json({ error: "Limit and skip parameters must be numbers" });

        }

        let sortColumn = '';

        if (searchParam === 'title') {

            sortColumn = 'title';

        } else if (searchParam === 'year') {

            sortColumn = 'yearOfWork';

        } else {

            return res.status(400).json({ error: `Invalid sort parameter: '${searchParam}' Use 'title' or 'year'` });

        }

        const { data, error } = await supabase
            .from('paintings')
            .select('*, artists(*), galleries(*)')
            .order(sortColumn, { ascending: true })
            .range(skip, skip + limit - 1);

        if (error) {

            return res.status(400).json({ error: error.message });

        }
        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found for skip offset: ${skip}` });

        }

        res.send(data);
    });

    /*
     GET /api/paintings/search/:substring
     Returns paintings whose title contains the substring.
    */
    app.get('/api/paintings/search/:substring', async (req, res) => {

        const substring = req.params.substring;

        const { data, error } = await supabase
            .from('paintings')
            .select('*, artists(*), galleries(*)')
            .ilike('title', `%${substring}%`)
            .order('yearOfWork', { ascending: true });

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found matching title like: '${substring}'` });

        }

        res.send(data);
    });

    /*
     GET /api/paintings/years/:start/:end
     Returns paintings between two years, sorted by year.
    */
    app.get('/api/paintings/years/:start/:end', async (req, res) => {

        const start = parseInt(req.params.start);
        const end = parseInt(req.params.end);

        if (isNaN(start) || isNaN(end)) {

            return res.status(400).json({ error: "Start and end years must be numbers" });

        }

        if (start > end) {

            return res.status(400).json({ error: "Start year must be before end year" });

        }

        const { data, error } = await supabase
            .from('paintings')
            .select('*, artists(*), galleries(*)')
            .gte('yearOfWork', start)
            .lte('yearOfWork', end)
            .order('yearOfWork', { ascending: true });

        if (error) {

            return res.status(400).json({ error: error.message });
            
        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found between years: ${start} and ${end}` });

        }

        res.send(data);
    });

    /*
     GET /api/paintings/galleries/:galleryId
     Returns all paintings in a given gallery, sorted by year.
    */
    app.get('/api/paintings/galleries/:galleryId', async (req, res) => {

        const galleryId = parseInt(req.params.galleryId);

        if (isNaN(galleryId)) {

            return res.status(400).json({ error: "Invalid gallery ID" });

        }

        const { data, error } = await supabase
            .from('paintings')
            .select('*, artists(*), galleries(*)')
            .eq('galleryID', galleryId)
            .order('yearOfWork', { ascending: true });

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found with gallery ID: ${galleryId}` });

        }

        res.send(data);
    });

    /*
     GET /api/paintings/artist/:artistId
     Returns all paintings by a given artist, sorted by year.
    */
    app.get('/api/paintings/artist/:artistId', async (req, res) => {

        const artistId = parseInt(req.params.artistId);
        
        if (isNaN(artistId)) {

            return res.status(400).json({ error: "Invalid artist ID" });

        }

        const { data, error } = await supabase
            .from('paintings')
            .select('*, artists(*), galleries(*)')
            .eq('artistID', artistId)
            .order('yearOfWork', { ascending: true });

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found with artist ID: ${artistId}` });

        }

        res.send(data);
    });
    
    /*
    GET /api/paintings/genre/:genreId
     Returns paintingId, title, yearOfWork for a given genre, sorted by year.
    */
    app.get('/api/paintings/genre/:genreId', async (req, res) => {

        const genreId = parseInt(req.params.genreId);

        if (isNaN(genreId)) {

            return res.status(400).json({ error: "Invalid genre ID" });

        }

        const { data, error } = await supabase
            .rpc('get_paintings_by_genre', { genre_id: genreId });

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found for genre ID: ${genreId}` });

        }

        res.send(data);
    });

    /*
     GET /api/paintings/era/:eraId
     Returns paintingId, title, yearOfWork for a given era, sorted by year.
    */
    app.get('/api/paintings/era/:eraId', async (req, res) => {
        
        const eraId = parseInt(req.params.eraId);

        if (isNaN(eraId)) {

            return res.status(400).json({ error: "Invalid era ID" });

        }

        const { data, error } = await supabase
            .rpc('get_paintings_by_era', { era_id: eraId });

        if (error) {

            return res.status(400).json({ error: error.message });
            
        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No paintings found with era ID: ${eraId}` });

        }

        res.send(data);
    });
}

module.exports = handlePaintings;