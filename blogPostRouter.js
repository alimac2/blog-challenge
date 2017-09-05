"use strict"

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const {BlogPosts} = require("./models");

BlogPosts.create("John Jacob Jingleheimer Schmidt", "His name is my name too. Whenever we gout out the people always shout, 'There goes John Jacob Jingleheimer Schmidt!'", "John Jacob Jingleheimer Schmidt");
BlogPosts.create("Hakuna Matata", "It means no worries for the rest of your days. It's a problem-free philosophy.", "Pumba and Timon");

//why is the route "/""  and not "/blog-posts"?
router.get("/", (req, res) => {
    res.json(BlogPosts.get());
  });
  
  router.post("/", jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author", "publishDate"]; /* if publish date is optional, do we include it? */
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
  });
  
  router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ["id","title", "content", "author", "publishDate"]; /* this includes publish date.... */
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    if (req.params.id !== req.body.id) {
      console.log('here');
      const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    ShoppingList.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  });
  

  router.delete('/:id', (req, res) => {
    ShoppingList.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.ID}\``);
    res.status(204).end();
  });

  module.exports = router;