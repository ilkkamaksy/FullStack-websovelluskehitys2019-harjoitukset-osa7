const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const User = require('../models/user');

describe('when there is initially 1 user in db', () => {
    beforeEach( async () => {
        await User.deleteMany({});
        const user = new User({ username: 'testroot', password: 'sekret' });
        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'ilkkamak',
            name: 'Ilkka Mäkinen',
            password: 'salainen'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const userNames = usersAtEnd.map(u => u.username);
        expect(userNames).toContain(newUser.username);
    });

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'testroot',
            name: 'Superuser',
            password: 'salsa'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });

    test('fails if username is not at least 3 chars', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'te',
            name: 'User with too short username',
            password: 'salis'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('is shorter than the minimum allowed length');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });

    test('fails if password is not at least 3 chars', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'usertesting',
            name: 'User with too short password',
            password: 'sa'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('password is shorter than the minimum allowed length (3)');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});