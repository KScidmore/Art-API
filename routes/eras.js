/*
File: eras.js
Description: API routes for retrieving art history eras.
*/

const handleEras = (app, supabase) => {

    /*
     GET /api/eras
     Returns all the eras.
    */
    app.get('/api/eras', async (req, res) => {

        const { data, error } = await supabase
            .from('eras')
            .select();

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

                return res.status(404).json({ error: "No eras found" });

        }

        res.send(data);

    });
};

module.exports = handleEras;