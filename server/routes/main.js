import express from 'express';
import Post from '../models/post.js'
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const foundItems = await Post.find()
    foundItems.forEach(function(item){ 
      console.log(item.title)
    })
    res.render('main', { layout: './layouts/main', postlist: foundItems});
    // res.render('main', { layout: './layouts/main' });
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

// // TEST CODE TO INSERT POST INTO MONGODB
// function insertPost() {
//   Post.insertOne({
//     title: 'tteok2',
//     content: 'pls load the image man i will beg',
//     slug: 'tteok2',
//     image: "tteokbokki.jpg"
//   })
// }
// insertPost();

export default router;