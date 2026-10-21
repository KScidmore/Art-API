const handleArtists = (app, supabase) =>{

    app.get('/api/', async (req, res) => {

        const {data, error} = await supabase
            .from('artists')
            .select();
        
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.send(data);
    });

    app.get('/api/artists/:artistId', async (req, res) => {

        const artistId = req.params.artistId;

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