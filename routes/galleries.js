const handleGalleries = (app, supabase) =>{

    //Return rows for all galleries
    app.get('/api/galleries', async (req, res) => {

        const {data, error} = await supabase
            .from('galleries')
            .select();
        res.send(data);

        if (error) {
            return res.status(404).json({ error: 'Galleries not found' });
        }
    });

    app.get('/api/galleries/:galleryId', async (req, res) => {

        const galleryId = req.params.galleryId;

        const {data, error} = await supabase
            .from('galleries')
            .select()
            .eq('galleryId', galleryId);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `Gallery with ID:${galleryId} not found` });
        }

        res.send(data);
    });

    app.get('/api/galleries/:galleryId', async (req, res) => {

        const galleryId = req.params.galleryId;

        const {data, error} = await supabase
            .from('galleries')
            .select()
            .eq('galleryId', galleryId);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `Gallery with ID:${galleryId} not found` });
        }

        res.send(data);
    });
}

module.exports = handleGalleries;