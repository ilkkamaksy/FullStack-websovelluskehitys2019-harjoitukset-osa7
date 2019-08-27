const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
    const posts = await Blog
        .find({}).populate('user', { username: 1, name: 1 });
    response.json(posts.map(post => post.toJSON()));
});

blogRouter.get('/:id', async (request, response, next) => {
    try {
        const post = await Blog.findById(request.params.id);
        if ( post ) {
            response.json(post.toJSON());
        } else {
            response.status(404).end();
        }
    } catch(exception) {
        next(exception);
    }
});

blogRouter.post('/', async (request, response, next) => {
    const body = request.body;
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if ( !request.token || !decodedToken.id ) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const user = await User.findById(decodedToken.id);
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        });
        const savedPost = await blog.save();
        user.blogs = user.blogs.concat(savedPost._id);
        await user.save();
        response.json(savedPost.toJSON());
    } catch(exception) {
        next(exception);
    }
});

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if ( !request.token || !decodedToken.id ) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const blog = await Blog.findById(request.params.id);
        if ( blog.user.toString() === decodedToken.id ) {
            await Blog.findByIdAndDelete(request.params.id);
            response.status(204).end();
        } else {
            response.status(401).json({ error: 'forbidden' });
        }
    } catch (exception) {
        next(exception);
    }
});

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body;
    const post = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    try {
        const updatedPost = await Blog.findByIdAndUpdate(request.params.id, post, { new: true } );
        response.json(updatedPost.toJSON());
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogRouter;