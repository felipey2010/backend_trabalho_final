const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of blogs here

/*
Structure of blogs
Title - Body - Author - Image (url) - Category
*/
const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title of blog is required"],
  },
  body: {
    type: String,
    required: [true, "Content of the blog is required"],
  },
  author: {
    type: String,
    required: [true, "Name of author is required"],
  },
  image: {
    type: String,
    default:
      "https://www.pngkey.com/png/detail/875-8752234_icono-noticias-noticia.png",
    // required: [true, "URL of image is required"],
  },
  category: {
    type: String,
    required: [true, "Article category is required"],
  },
});

const Blogs = mongoose.model("blogs", BlogSchema);

module.exports = Blogs;
