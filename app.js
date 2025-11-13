import * as dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import router from './server/routes/main.js';

dotenv.config();

const app = express();

// Serve static assets (optional, if needed)
app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('views', './views');
app.set('view engine', 'ejs');

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/', router);

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})