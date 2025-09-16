const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Homepage
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create post
app.post("/create", (req, res) => {
  const { author, title, content } = req.body;
  posts.push({
    id: Date.now(),
    author,
    title,
    content,
    createdAt: new Date().toLocaleString()
  });
  res.redirect("/");
});

// Edit form
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", { post });
});

// Save edited post
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

// Delete post
app.get("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
