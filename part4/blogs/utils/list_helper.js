var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.map(b => b.likes)
        .reduce((i, j) => i + j, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    const max = Math.max(...blogs.map(b => b.likes))
    return blogs.find(b => b.likes === max)
}


const mostBlogs = (blogs) => {
    const mostBlogs = _(blogs)
        .groupBy('author')
        .values()
        .max()
    return mostBlogs ? {
        author: mostBlogs.find(p => p.author).author,
        blogs: mostBlogs.length
    } : undefined
}

const mostLikes = (blogs) => {
    //for lodash
    if (_.isEmpty(blogs)) return undefined
    return _(blogs)
        .groupBy('author')
        .values()
        .maxBy(totalLikes)
        .reduce((a, b) => ({
            author: b.author,
            likes: a.likes + b.likes
        }), { author: undefined, likes: 0 })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}