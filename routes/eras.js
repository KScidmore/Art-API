/*
File: eras.js
Description: API routes for retrieving art history eras.
*/

const handleEras = (app, supabase) => {

    /*
     GET /api/eras
     Returns all the eras from the database.
    */
    app.get('/api/eras', async (req, res) => {

        try {

            const { data, error } = await supabase
                .from('eras')
                .select();

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No eras found." });
            }

            res.json(data);

        } catch (err) {

            res.status(500).json({ error: err.message });

        }
    });
};

module.exports = handleEras;