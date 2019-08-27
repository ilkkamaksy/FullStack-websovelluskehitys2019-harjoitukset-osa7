const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogPosts = [
    {
        title: 'Hello world',
        author: 'Erkki',
        url: 'hello-world',
        likes: 5,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
    },
];

const postsIndDb = async () => {
    const results = await Blog.find({});
    return results.map(r => r.toJSON());
};

const nonExistingId = async () => {
    const post = new Blog({
        title: 'To be removed',
        author: 'Erkki',
        url: 'to-be-removed',
    });

    await post.save();
    await post.remove();
    return post._id.toString();
};

const usersInDb = async () => {
    const results = await User.find({});
    return results.map(r => r.toJSON());
};

module.exports = {
    initialBlogPosts,
    postsIndDb,
    nonExistingId,
    usersInDb
};