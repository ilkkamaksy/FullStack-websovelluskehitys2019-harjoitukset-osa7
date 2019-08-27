const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

describe('when there are initially some posts saved', () => {
    test('blog posts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    test('all blog posts are returned', async () => {
        const response = await helper.postsIndDb();
        expect(response.length).toBe(helper.initialBlogPosts.length);
    });
    test('a specific blog post is within the returned posts', async () => {
        const response = await helper.postsIndDb();
        const titles = response.map(r => r.title);
        expect(titles).toContain('Hello world');
    });
    test('posts have an id property', async () => {
        const posts = await helper.postsIndDb();
        expect(posts[0].id).toBeDefined();
    });
});

describe('viewing a single post', () => {
    test('succeeds with a valid id', async () => {
        const postsAtStart = await helper.postsIndDb();
        const selectedPost = postsAtStart[0];
        const resultPost = await api
            .get(`/api/blogs/${selectedPost.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(resultPost.body).toEqual(selectedPost);
    });
    test('fails with status code 404 when post does not exist', async () => {
        const postId = helper.nonExistingId();

        await api
            .get(`/api/posts/${postId}`)
            .expect(404);
    });
});

describe('saving posts', () => {
    test('succeeds with valid data', async () => {
        const newPost = {
            title: 'First example post',
            author: 'Matti',
            url: 'first-example-post',
            likes: 10,
        };
        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const postsAtEnd = await helper.postsIndDb();
        const titles = postsAtEnd.map(r => r.title);
        expect(postsAtEnd.length).toBe(helper.initialBlogPosts.length + 1);
        expect(titles).toContain('First example post');
    });
    test('likes default to 0 when no likes are defined', async () => {
        const newPost = {
            title: 'A post without likes',
            author: 'Pekka',
            url: 'post-without-likes',
        };
        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const postsAtEnd = await helper.postsIndDb();
        const likes = postsAtEnd.map(r => r.likes);
        expect(likes[likes.length-1]).toBe(0);
    });
    test('fails with status code 400 on invalid data', async () => {
        const newPost = {
            author: 'Jalmari',
            url: 'foo-bar'
        };

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(400);
    });
});

describe('updating posts', () => {
    test('update valid post succeeds', async () => {
        const postsAtStart = await helper.postsIndDb();
        const postToUpdate = postsAtStart[0];
        postToUpdate.likes = postToUpdate.likes + 10;
        const updatedPost = await api
            .put(`/api/blogs/${postToUpdate.id}`)
            .send(postToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(updatedPost.body.likes).toBe(postToUpdate.likes);
    });
    test('update invalid post fails with status code 400', async () => {
        const postsAtStart = await helper.postsIndDb();
        const postToUpdate = postsAtStart[0];
        postToUpdate.id = '124214124';
        postToUpdate.likes = postToUpdate.likes + 10;
        await api
            .put(`/api/blogs/${postToUpdate.id}`)
            .send(postToUpdate)
            .expect(400);
    });
});

describe('deleting posts', () => {
    test('deleting valid post succeeds', async () => {
        const postsAtStart = await helper.postsIndDb();
        const postToDelete = postsAtStart[0];
        await api
            .delete(`/api/blogs/${postToDelete.id}`)
            .expect(204);

        const postsAtEnd = await helper.postsIndDb();
        expect(postsAtEnd.length).toBe(postsAtStart.length-1);

        const titles = postsAtEnd.map(r => r.title);
        expect(titles).not.toContain(postToDelete.title);
    });
});

beforeEach(async () => {
    await Blog.remove({});

    const blogObjects = helper.initialBlogPosts.map(post => new Blog(post));
    const promiseArr = blogObjects.map(post => post.save());
    await Promise.all(promiseArr);

});

afterAll(() => {
    mongoose.connection.close();
});