import express from 'express';
import Post from '../models/post.js'
const tagsRouter = express.Router();

tagsRouter.get('/', async (req, res) => {
    try {
        console.log("using tagsRouter")
        // tagList = document.getElementsByClassName("tag")

        const specTags = ["Italian", "Korean"];
        const t = "Italian"
        console.log(specTags)
        const d = await Post.find({tags: {$in: specTags}});
        d.forEach(function(item){
            // console.log(item.title)
        })
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
    let result = await Post.findOne({tags: {$in: query}})
    if (!result) res.status(200).send("not ffound")
    else res.status(200).send(result)
})

export default tagsRouter;