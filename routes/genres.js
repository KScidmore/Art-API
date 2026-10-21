const handleGenres = (app, supabase) =>{

    app.get('/api/genres', async (req, res) => {

        const {data, error} = await supabase
            .from('genres')
            .select('*, eras(*)');
        

        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.send(data);
    });

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

    app.get('/api/genres/painting/:paintingId', async (req, res) => {

        const paintingId = req.params.paintingId;

        const {data, error} = await supabase
            .from('paintinggenres')
            .select('genres(*, eras(*))')
            .eq('paintingId', paintingId);


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