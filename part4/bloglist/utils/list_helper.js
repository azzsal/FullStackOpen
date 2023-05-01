const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((acc, curr) => {
    return acc + curr.likes
  }, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  }, {})
  return blogs.length === 0
    ? {}
    : result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}