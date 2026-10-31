/*
File: counts.js
Description: API routes for genre counts, artist painting counts, and top genres filtered by a painting threshold.
*/

const handleCounts = (app, supabase) => {

    /*
     GET /api/counts/genres
     Returns total painting counts for each genre.
    */
    app.get('/api/counts/genres', async (req, res) => {

        const { data, error } = await supabase
            .rpc('get_genre_counts');

        if (error) {

            return res.status(400).json({ error: error.message });
            
        }

        res.send(data);
    });

    /*
     GET /api/counts/artists
     Returns painting counts for each artist, ordered from most to fewest.
    */
    app.get('/api/counts/artists', async (req, res) => {
        
        const { data, error } = await supabase
            .rpc('get_artist_counts');

        if (error) {
            
            return res.status(400).json({ error: error.message });

        }


        res.send(data);

    });

    /*
     GET /api/counts/topgenres/:threshold
     Returns genres that have a painting count meeting or exceeding the threshold.
    */
    app.get('/api/counts/topgenres/:threshold', async (req, res) => {
    
        const threshold = parseInt(req.params.threshold);

        if (isNaN(threshold)) {

            return res.status(400).json({ error: "Threshold must be a number" });

        }

        const { data, error } = await supabase
            .rpc('get_top_genres', { threshold: threshold });

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No genres found with painting count exceeding: ${threshold}` });

        }

        res.send(data);

    });
};

module.exports = handleCounts;