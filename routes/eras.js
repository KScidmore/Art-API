const handleEras = (app, supabase) =>{

    app.get('/api/eras', async (req, res) => {

        const {data, error} = await supabase
            .from('eras')
            .select();
        res.send(data);

        if (error) {
            return res.status(400).json({ error: error.message });
        }
    })
}

module.exports = handleEras;