/*
File: artists.js
Description: API routes for retrieving all artists, a specific artist by ID, 
artists searched by last name substring, and artists filtered by nationality substring.
*/

const handleArtists = (app, supabase) =>{

    /*
     GET /api/artists
     Returns all the artists.
    */
    app.get('/api/artists', async (req, res) => {

        const {data, error} = await supabase
            .from('artists')
            .select();
        
        if (error) {

            return res.status(400).json({ error: error.message });

        }
        
        if (!data || data.length === 0) {

                return res.status(404).json({ error: "No artists found" });

        }

        res.send(data);
    });

    /*
     GET /api/artists/:artistId
     Returns just the specified artist using the artistId field.
    */
    app.get('/api/artists/:artistId', async (req, res) => {

        const artistId = parseInt(req.params.artistId);

        if (isNaN(artistId)) {

            return res.status(400).json({ error: "Invalid artist ID" });

        }

        const {data, error} = await supabase
            .from('artists')
            .select()
            .eq('artistId', artistId);

        if (error) {

            return res.status(400).json({ error: error.message });

        }
        if (!data || data.length === 0) {

            return res.status(404).json({ error: `Artist with ID:${artistId} not found` });

        }

        res.send(data);
    });

    /*
     GET /api/artists/search/:substring
     Returns the artists whose last name begins with the provided substring.
    */
    app.get('/api/artists/search/:substring', async (req, res) => {

        const substring = req.params.substring;

        const {data, error} = await supabase
            .from('artists')
            .select()
            .ilike('lastName', `${substring}%`)
            .order('lastName', {ascending: true});

        if (error) {

            return res.status(400).json({ error: error.message });

        }
        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No artist found who's last name starts with: ${substring}` });

        }

        res.send(data);
    });

    /*
     GET /api/artists/country/:substring
     Returns the artists whose nationality begins with the provided substring.
    */
    app.get('/api/artists/country/:substring', async (req, res) => {

        const substring = req.params.substring;

        const {data, error} = await supabase
            .from('artists')
            .select()
            .ilike('nationality', `${substring}%`)
            .order('nationality', {ascending: true});

        if (error) {

            return res.status(400).json({ error: error.message });

        }
        
        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No artist found from a country that starts with: ${substring}` });
            
        }

        res.send(data);
    });

}

module.exports = handleArtists;