import express from 'express';
import Post from '../models/post.js'
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const foundItems = await Post.find()
    foundItems.forEach(function(item){ 
      // console.log(item.subtitle)
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

// TEST CODE TO INSERT POST INTO MONGODB
// function insertPost() {
//   Post.insertOne({
//     title: 'Hot shots (for non-Europeans)',
//     content: '<p class="has-line-data" data-line-start="0" data-line-end="1">This came to me because I went to the grocery to buy salmon, and next to the normal fillets (about 12 dollars) they had a set called “maple bourbon glazed salmon” that cost 22 dollars. “That sounds delicious,” I thought. “I\’m going to make that myself.” So I did. And you know what? It is delicious. And since I already had bourbon and maple syrup on hand, it didn\’t cost me 22 dollars (chef math).</p><p class="has-line-data" data-line-start="2" data-line-end="3">One note, bourbon is a type of whiskey made in the United States. So if you\’re a Canadian protesting the bourbon industry due to U.S. tariff laws, any whiskey will work fine. Bourbon tends to be a little sweeter than other whiskeys though (since it\’s made from corn), so adjust the sweetness accordingly.</p><p class="has-line-data" data-line-start="4" data-line-end="5">The salmon itself is seasoned minimally so that most of the flavor comes from the glaze.</p>',
//     subtitle: "Take three flavorful things and put it on some fish",
//     slug: 'maple-bourbon-salmon',
//     image: "mbsgsalmon.jpg",
//     ingredients: [
//       "2 tbsp (or 1/8 cup) of bourbon (I use Maker’s Mark)",
//       "1/3 cup soy sauce",
//       "3 tbsp light brown sugar",
//       "2 tbsp A grade dark robust maple syrup",
//       "2 green onions, thinly sliced",
//       "1 clove minced garlic",
//       "1 tsp minced ginger"
//       ],
//     procedure: [
//       "Preheat oven to 400F. Heat small saucepan over medium-low heat",
//       "Add 2 salmon fillets skin-side down to a small baking sheet lined with parchment paper. Season surface with salt and pepper. Brush the fillets with vegetable oil. Add to the oven and cook for about 12-14 minutes.",
//       "Add all glaze ingredients to the saucepan, then stir to combine. Stir occasionally and wait for the glaze to thicken into more of a syrup. This should take about 10 minutes. Keep in mind the glaze will also thicken up as it cools. ",
//       "When both the salmon and glaze are done, brush the salmon fillets generously with the glaze. Serve over white rice and sauteed vegetables."
//     ],
//   })
// }
// insertPost();

export default router;