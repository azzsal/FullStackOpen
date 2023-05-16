const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "How to crush Div 4",
    author: "Him",
    url: "www.google.com",
  },
  {
    title: "Memory Leaks",
    author: "Me",
    url: "www.google.com",
  },
  {
    title: "Best PC",
    author: "Her",
    url: "www.google.com",
  }
]

const getAllBlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, getAllBlogsInDb
}