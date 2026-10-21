const handleEras = (app, supabase) =>{

    app.get('/api/eras', async (req, res) => {

        const {data, error} = await supabase
            .from('eras')
            .select();
        res.send(data);

        if (error) {
            return res.status(404).json({ error: 'Eras not found' });
        }
    })
}

module.exports = handleEras;