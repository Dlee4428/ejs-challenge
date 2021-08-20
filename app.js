//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
// Load the full build.
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


// Global Variable to access each functions
let globalData = [];

// App to use EJS 
app.set("view engine", "ejs");

// Home Getter
app.get("/", function(req, res){
  // Render home ejs variables 
  res.render("home", {
    homeRenderContent: homeStartingContent, 
    homePostData: globalData,
    _:_
  });
});

// About Getter
app.get("/about", function(req, res){
  // Render about ejs variables 
  res.render("about", {aboutRenderContent: aboutContent});
});

// Contact Getter
app.get("/contact", function(req, res){
  // Render contact ejs variables 
  res.render("contact", {contactRenderContent: contactContent});
});

// Compose Getter
app.get("/compose", function(req, res){
  // Render compose ejs variables
  res.render("compose");
});

// Express Params to Dynamic way to access under post
app.get("/post/:postName", function(req, res) {
  // lodash to convert to lowercase for web address
  const requestedTitle = _.lowerCase(req.params.postName);

  // Loop through array of posts
  globalData.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    // Check if stored title matches with requested title
    // Using lodash to lowercase all strings
    if (storedTitle === requestedTitle) {
      // Render Page with post.ejs content with value of title and content
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

// Compose Post method
app.post("/compose", function(req, res){
  // Create local object to store title and content of user post
  const postData = {
    title: req.body.postTitle,
    content: req.body.postText
  };

  // Append postData inside global array data
  globalData.push(postData);

  // Redirect to home route
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
