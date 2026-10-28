/*
File: genres.js
Description: API routes for retrieving all genres with era details, 
specific genres by ID reference, and genres used in a specific painting sorted by name.
*/

const handleGenres = (app, supabase) =>{

    /*
     GET /api/genres
     Returns all the genres, including all era fields.
    */
    app.get('/api/genres', async (req, res) => {

        const {data, error} = await supabase
            .from('genres')
            .select('*, eras(*)');
        

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        res.send(data);

    });

    /*
     GET /api/genres/:genreId
     Returns just the specified genre using the genreId field, including all era fields.
    */
    app.get('/api/genres/:genreId', async (req, res) => {

        const genreId = parseInt(req.params.genreId);

        if (isNaN(genreId)) {

            return res.status(400).json({ error: "Invalid genre ID" });

        }

        const {data, error} = await supabase
            .from('genres')
            .select('*, eras(*)')
            .eq('genreID', genreId);

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `Genre with ID:${genreId} not found` });
        }

        res.send(data);

    });

    /*
     GET /api/genres/painting/:paintingId
     Returns the genres used in a given painting, ordered by genreName in ascending order.
    */
    app.get('/api/genres/painting/:paintingId', async (req, res) => {
        
        const paintingId = parseInt(req.params.paintingId);

        if (isNaN(paintingId)) {

            return res.status(400).json({ error: "Invalid painting ID" });

        }

        const { data, error } = await supabase
            .rpc('get_genres_by_painting', { painting_id: paintingId });

        if (error) {

            return res.status(400).json({ error: error.message });

        } 

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No genres found for painting with ID: ${paintingId}` });

        }

        res.send(data);

    });
    
}

module.exports = handleGenres;