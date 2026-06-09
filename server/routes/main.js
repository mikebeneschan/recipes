import express from 'express';
import Post from '../models/post.js'
const router = express.Router();

// homepage
router.get('/', async (req, res) => {
  try {
    const heroArray = await Post.find().sort({publishDate: 'desc'}).limit(1)
    const hero = heroArray[0]
    const foundItems = await Post.find().sort({publishDate: 'desc'}).lean().skip(1).limit(4)
    // foundItems.forEach(function(item){ 
    // })
    res.render('main', { layout: './layouts/main', data: foundItems, hero: hero, desc: "homepage!!!"});
  } catch (error) {
     console.log(error);
  }
});

// All recipe posts are routed through here
router.get('/recipes/:slug', async (req,res) => {
  const {slug} = req.params
  const result = await Post.findOne({ slug })
  console.log(result.tags)
  let layout = ''
  if (result.tags.includes('Not a recipe')){ 
    console.log ('no recipe detected')
    layout = './layouts/postnorecipe'
  } else { layout = './layouts/post'}

  res.render('post', {
    layout: layout,
    title: result.title,
    data: result
  })
})

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    layout: './layouts/main',
    title: 'About Me',
    desc: "About Mike, the guy who made this website"
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    layout: './layouts/main',
    title: 'Contact',
    desc: "The contact page"
  });
});


router.post('/posts', async (req,res) => {
    let query = req.body.prompt
    console.log("query:" +query)
    let result = await Post.find().limit(query).skip(1).sort({publishDate: 'desc'}).lean()
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

export default router;