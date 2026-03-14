import * as dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import router from './server/routes/main.js';
import tagsRouter from './server/routes/tags.js';

import connectDB from './server/config/db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongoDB
connectDB();

app.use(express.static('public'));

app.use(expressLayouts);
app.use(express.json())
app.set('layout', './layouts/main');
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/tags', tagsRouter);
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
