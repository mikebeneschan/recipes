import express from 'express';
import Post from '../models/post.js'
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const foundItems = await Post.find().sort({publishDate: 'desc'}).lean()
    foundItems.forEach(function(item){ 
    })
    res.render('main', { layout: './layouts/main', postlist: foundItems});
  } catch (error) {
     console.log(error);
  }
});

// All recipe posts are routed through here
router.get('/recipes/:slug', async (req,res) => {
  const {slug} = req.params
  const result = await Post.findOne({ slug })
  console.log(result.image)
  res.render('post', {
    layout: './layouts/post',
    title: result.title,
    data: result
  })
})

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    layout: './layouts/main',
    title: 'About Me'
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    layout: './layouts/main',
    title: 'Contact'
  });
});

export default router;