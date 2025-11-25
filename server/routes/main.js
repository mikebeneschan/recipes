import express from 'express';
import Post from '../models/post.js'
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', { layout: './layouts/main' });
});

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

function insertPost() {
  Post.insertOne({
    title: 'post1',
    content: 'lorem ipsum'
  })
}
insertPost();

export default router;