import express from 'express';
import Post from '../models/post.js'
const tagsRouter = express.Router();

tagsRouter.get('/', async (req, res) => {
    try {
        console.log("using tagsRouter")
        let d = []

        res.render('tags', {
        layout: './layouts/main',
        title: 'Tags',
        data: d
        });
    } catch(error) {
        console.log(error);
    }
});

tagsRouter.post('/tagFind', async (req,res) => {
    let query = req.body.prompt
    console.log(query)
    let result = await Post.find({tags: {$all: query}})
    res.render(
        'partials/foundPosts',
        { 
            data: result,
            layout: false 
        },
        (err, html) => {
        if (err) return res.status(500).send(err);
        res.json({ html });
        }
    )
  });

export default tagsRouter;