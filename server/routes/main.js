import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Homepage route hit!');
  res.render('main', { layout: './layouts/main' });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    layout: './layouts/main',
    title: 'About Us'
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