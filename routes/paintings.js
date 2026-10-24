

const handlePaintings = (app, supabase) =>{
    
    app.get('/api/paintings', async (req, res) => {

        const {data, error} = await supabase
            .from('paintings')
            .select();
        
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.send(data);
    });

    app.get('/api/paintings/single/:paintingId', async (req, res) => {

        const paintingId = req.params.paintingId;

        const {data, error} = await supabase
            .from('paintings')
            .select()
            .eq('paintingId', paintingId);

        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: `Painting with ID:${paintingId} not found` });
        }

        res.send(data);
    });

    app.get('/api/paintings/sort/:searchParam/limit/:limit', async (req, res) => {

        const searchParam = req.params.searchParam;
        const limit = req.params.limit;

        const parsedValue = Number(searchParam);

        if(!isNaN(parsedValue)){
            const {data, error} = await supabase
                .from('paintings')
                .select()
                .eq('paintingId', paintingId)
                .limit(limit);
        }else{


        }


        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: `Painting with ID:${paintingId} not found` });
        }

        res.send(data);
    });
}

module.exports = handlePaintings;