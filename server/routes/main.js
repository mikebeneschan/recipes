 import express from 'express';

 const router = express.Router();

 // Routes
 router.get('', (req, rest) => {
    res.send("Hi hi");
})