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
    let result = []
    const query = (req.body.prompt || '').trim()
    const tags = req.body.tags
    const synonymName = 'syn'
    const stopWords = new Set([
        'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for',
        'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or',
        'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they',
        'this', 'to', 'was', 'will', 'with'
    ])

    if (!query) {
        return res.json({ html: '', count: 0 })
    }

    // check that query isn't just English stopwords
    const meaningfulTokens = query
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token && !stopWords.has(token))

    if (meaningfulTokens.length === 0) {
        result = []
    } else {
        try {
            result = await Post.aggregate([
                {
                    $search: {
                        "index": "searchv1",
                        "compound": {
                            "should": [
                                {
                                    "autocomplete": {
                                        "query": query,
                                        "path": "title",
                                    }
                                },
                                {
                                    "text": {
                                        "query": query,
                                        "path": "subtitle",
                                        "synonyms": synonymName
                                    }
                                },
                                {
                                    "text": {
                                        "query": query,
                                        "path": "content",
                                        "synonyms": synonymName
                                    }
                                },
                                {
                                    "text": {
                                        "query": query,
                                        "path": "tags",
                                        "synonyms": synonymName
                                    }
                                },
                                {
                                    "text": {
                                        "query": query,
                                        "path": [
                                            "recipeCards.label",
                                            "recipeCards.procedure",
                                            "recipeCards.ingredients.sectionName",
                                            "recipeCards.ingredients.ings"
                                        ],
                                        "synonyms": synonymName
                                    }
                                }
                            ],
                            "minimumShouldMatch": 1
                        }
                    }
                },
                ...(tags.length > 0 ? [{ $match: { tags: { $all: tags } } }] : [])
            ])
        } catch (error) {
            throw error
        }
    }

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