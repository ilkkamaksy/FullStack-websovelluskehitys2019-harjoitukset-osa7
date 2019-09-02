const jwt = require('jsonwebtoken');
const commentsRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({}).populate('blog', { title: 1, url: 1, author: 1 });
    response.json(comments.map(comment => comment.toJSON()));
});

commentsRouter.get('/:id', async (request, response, next) => {
    try {
        const comment = await Comment.findById(request.params.id);
        if ( comment ) {
            response.json(comment.toJSON());
        } else {
            response.status('404').end();
        }
    } catch (exception) {
        next(exception);
    }
});

commentsRouter.post('/', async (request, response, next) => {
    const body = request.body;
    try {
        const blog = await Blog.findById(body.blog_id);
        const comment = new Comment({
            content: body.content,
            blog: blog._id,
            date: new Date()
        });
        const savedComment = await comment.save();
        blog.comments = blog.comments.concat(savedComment._id);
        await blog.save();
        response.json(savedComment.toJSON());
    } catch (exception) {
        next(exception);
    }
});

commentsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if ( !request.token || !decodedToken.id ) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        await Comment.findByIdAndDelete(request.params.id);
        response.status(204).end();

    } catch (exception) {
        next(exception);
    }
});

module.exports = commentsRouter;