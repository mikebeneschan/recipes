import * as dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
dotenv.config();




const app = express();

app.use(expressLayouts)

const PORT = 8080 || process.env.PORT // make sure this port is working

app.get('', (req, rest) => {
    res.send("Hi hi");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})