import * as dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import router from './server/routes/main.js';

import connectDB from './server/config/db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongoDB
connectDB();


// Serve static assets (for example, the css file)
app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('views', './views');
app.set('view engine', 'ejs');

// Log requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})