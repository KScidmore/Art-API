const express = require('express');
const app = express();

const supa = require('@supabase/supabase-js');
const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

require('./routes/artists')(app, supabase);
//require('./routes/counts')(app, supabase);
require('./routes/eras')(app, supabase);
require('./routes/galleries')(app, supabase);
//require('./routes/genres')(app, supabase);
//require('./routes/paintings')(app, supabase);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));