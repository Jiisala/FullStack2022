const _ = require('lodash')
const dummy = (blogs) => 1

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => sum + item.likes, 0)

}
const favoriteBlog = (blogs => {
  const favorite = blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, 0)
  return blogs.length === 0
    ? null
    : {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
})
const mostBlogs =(blogs => {
  const sortAuthors = _.countBy(blogs, (blog) => {return blog.author})
  return blogs.length === 0
    ? null
    : { author: Object.keys(sortAuthors).pop(),
      blogs: Object.values(sortAuthors).pop() }
})
const mostLikes = (blogs => {
  const likes = _(blogs)
    .groupBy('author')
    .map((values, key) => ({
      author: key,
      likes: _.sumBy(values, 'likes'),
    }))
    .value()
  return blogs.length === 0
    ? null
    : likes.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, 0)


})
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

