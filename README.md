# Welcome to my recipe site
This is the source code I wrote for a cooking blog where I share recipes and cooking advice.

**Link to project:** https://mikeb.cooking/

# Screenshots
<div align="center">
  <img width=60% src="https://firebasestorage.googleapis.com/v0/b/images-1f166.firebasestorage.app/o/github%20readme%20files%2Fpreviewlight.png?alt=media&token=b1572645-5e9b-4240-9e0d-75ac14d2004e">
  <img width=60% src="https://firebasestorage.googleapis.com/v0/b/images-1f166.firebasestorage.app/o/github%20readme%20files%2Fpreviewdarkmode.png?alt=media&token=b3ced60f-7cd2-46bc-a2d0-b58f1b151f3e">
  <img width=40% src="https://firebasestorage.googleapis.com/v0/b/images-1f166.firebasestorage.app/o/github%20readme%20files%2Fmobileview.jpg?alt=media&token=b67bb660-59a4-4dad-9228-606690dc1118">
</div>

# Technologies used
* Front-end: HTML, CSS, Vanilla JavaScript, EJS templates, Vite

* Back-end: Node, Express, MongoDB, Firebase Storage

* Admin-side: Electron (+HTML, CSS, Vanilla JS), Dillinger 

The website is currently hosted via OnRender.

Currently, recipe content is written in Markdown, then manually converted to HTML with [Dillinger.io](http://Dillinger.io).

AI tools were not used for any part of this project.

## Features

- Darkmode support
- Mobile view support
- Robust tag search system, allowing the user to filter recipes by one or multiple tags
- Support for multiple versions of recipes displayed on the same page (i.e. a vegetarian version and a non-vegetarian version)

## Basic overview of the tech stack
### Front-end
EJS templates are used to standardize UI layouts and create reusable UI blocks. For example, the "foundposts" partial is utilized by both the home page and the tags page.

Vanilla CSS is the only styling used in this project (i.e. no use of Tailwind or post-CSS processing)

### Back-end
Vite is used as the project's build tool.

MongoDB is used to store all data on individual recipes (no actual recipe data is stored in this source code). Image URLs are stored in MongoDB, and the actual image files for mikeb.cooking are hosted via Google Firebase Storage.

Express is mainly used for routing HTTP requests and server-side view rendering via EJS (In other words, Express makes sure the user is directed to the correct page and loads the correct EJS templates). Additionally, Express handles several API endpoints. For example, the "tagFind" endpoint, which is used on the tags page, queries the MongoDB collection for documents with tags that match the selected tags.

## Post Schema

Each post (each document in MongoDB) utilizes the PostSchema, which contains the following data:
- Title (required)
- Content as HTML (required)
- Subtitle
- Slug
- Tags (as an array)
- Publish date (by default, this is the upload time)
- Image (as URL)
- An array of recipeCardSchema objects

Each recipe card is defined by a recipeCardSchema object, which contains the following data:
- Label (the title that appears on the recipe card)
- Serving Size
- Procedure (as an array)
- An array of ingredientSchema objects

Finally, each section of ingredients within a recipe card utilizes an ingredientSchema object, which contains the following data:
- The ingredient section name
- Ingredients (as an array)


## Writing new recipes
Writing new recipes are handled via a separate Electron app. While not an ideal solution, this solution was chosen in the interest of security and as a result of the limitations of OnRender's free hosting plan. 

