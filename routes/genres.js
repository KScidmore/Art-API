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

        const genreId = req.params.genreId;

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

        const paintingId = req.params.paintingId;

        const {data, error} = await supabase
            .from('paintinggenres')
            .select('genres(*, eras(*))')
            .eq('paintingId', paintingId)
            .order('genreName', {referencedTable: 'genres', ascending: true});


        if (error) {

            return res.status(400).json({ error: error.message });

        }  

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `Painting with ID:${paintingId} not found` });

        }

        res.send(data);

    });
    
}

module.exports = handleGenres;