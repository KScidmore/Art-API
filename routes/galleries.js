/*
File: galleries.js
Description: API routes for retrieving all galleries, a specific gallery by ID reference, and galleries filtered by country substring.
*/

const handleGalleries = (app, supabase) =>{

    /*
     GET /api/galleries
     Returns all the galleries.
    */
    app.get('/api/galleries', async (req, res) => {

        const {data, error} = await supabase
            .from('galleries')
            .select();
        
        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: "No galleries found." });

        }

        res.send(data);

    });

    /*
     GET /api/galleries/:galleryId
     Returns just the specified gallery using the galleryId field.
    */
    app.get('/api/galleries/:galleryId', async (req, res) => {

        const galleryId = req.params.galleryId;

        const {data, error} = await supabase
            .from('galleries')
            .select()
            .eq('galleryId', galleryId);

        if (error) {

            return res.status(400).json({ error: error.message });

        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `Gallery with ID:${galleryId} not found` });

        }

        res.send(data);
    });

    /*
     GET /api/galleries/country/:substring
     Returns the galleries whose galleryCountry (case insensitive) begins with the provided substring, e.g., /api/galleries/country/fra.
    */
    app.get('/api/galleries/country/:substring', async (req, res) => {

        const substring = req.params.substring;

        const {data, error} = await supabase
            .from('galleries')
            .select()
            .ilike('galleryCountry', `${substring}%`)
            .order('galleryId', {ascending: true});

        if (error) {

            return res.status(400).json({ error: error.message });
            
        }

        if (!data || data.length === 0) {

            return res.status(404).json({ error: `No galleries found in a country that starts with: ${substring}` });

        }

        res.send(data);
    });
}

module.exports = handleGalleries;