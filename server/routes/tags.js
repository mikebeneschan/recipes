import express from 'express';
import Post from '../models/post.js'
const tagsRouter = express.Router();

tagsRouter.get('/', async (req, res) => {
    try {
        let d = []
        res.render('tags', {
        layout: './layouts/main',
        title: 'Tags',
        data: d,
        q: 0,
        desc: "tags"
        });
    } catch(error) {
        console.log(error);
    }
});

tagsRouter.post('/search', async (req,res) => {
    let query = req.body.prompt
    let result = await Post.aggregate([
        {
            $search: {
                "index": "searchv1",
                "text": {
                    "query": query,
                    "path": ["title","subtitle","content","tags"]
                }
            }
        }
    ]
    )
    res.render(
        'partials/foundPosts',
        { 
            data: result,
            layout: false,
            q: query.length 
        },
        (err, html) => {
        if (err) return res.status(500).send(err);
        res.json({ html, count: result.length });
        }
    )    
})
 
tagsRouter.post('/tagFind', async (req,res) => {
    let query = req.body.prompt
    let result = await Post.find({tags: {$all: query}}).sort({publishDate: 'desc'})
    res.render(
        'partials/foundPosts',
        { 
            data: result,
            layout: false,
            q: query.length 
        },
        (err, html) => {
        if (err) return res.status(500).send(err);
        res.json({ html, count: result.length });
        }
    )
});

tagsRouter.post('/renderAllPosts', async (req,res) => {
    let result = await Post.find().sort({publishDate: 'desc'}).lean()
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