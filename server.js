/**
 * File Name: server.js
 * Description: Main entry point for the Art Database API. 
 * Initializes Express, configures the Supabase client,
 * mounts all API routes, and starts the server listener.
 */
const express = require('express');
const app = express();

// Initialize the Supabase client
const supa = require('@supabase/supabase-js');
const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Mount route files
require('./routes/artists')(app, supabase);
//require('./routes/counts')(app, supabase);
require('./routes/eras')(app, supabase);
require('./routes/galleries')(app, supabase);
require('./routes/genres')(app, supabase);
require('./routes/paintings')(app, supabase);

// Define port and start the server listener
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));