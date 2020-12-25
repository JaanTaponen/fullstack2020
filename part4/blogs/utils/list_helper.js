var _ = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return _.sumBy(blogs, 'likes')
}

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
  // results in object with values { author : likes, ...}
  const blogsByAuthor = _.countBy(blogs, 'author')
  // We are going to map the results since the _maxby requires a array to operate.
  const b = _.keys(blogsByAuthor).map(author => {
    return {'author' : author, 'blogs' : blogsByAuthor[author]}
  })
  return _.maxBy(b, 'blogs')
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const b = _.keys(blogsByAuthor).map(author => {
    return {'author': author, 'likes': _.sumBy(blogsByAuthor[author], 'likes')}
  })
  return _.maxBy(b, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}