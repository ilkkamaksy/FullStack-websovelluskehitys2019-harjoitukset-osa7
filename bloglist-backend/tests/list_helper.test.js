const listHelper = require('../utils/list_helper');

test('Dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    const listWithOnePost = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOnePost);
        expect(result).toBe(5);
    });
});

describe('most liked post', () => {
    const listWithBlogPosts = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Second blog post',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 20,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Third blog post',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ];
    test('most liked post when there are multiple posts', () => {
        const result = listHelper.favoriteBlog(listWithBlogPosts);
        expect(result.likes).toBe(20);
    });

    const listWithOneBlogPost = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('most liked post when there is one post', () => {
        const result = listHelper.favoriteBlog(listWithOneBlogPost);
        expect(result.likes).toBe(5);
    });
});

describe('author with most blog posts', () => {
    const listWithBlogPosts = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Second blog post',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 20,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Third blog post',
            author: 'Erkki Esimerkki',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Fourth blog post',
            author: 'Erkki Esimerkki',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Fifth blog post',
            author: 'Erkki Esimerkki',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Sixth blog post',
            author: 'Lassi Jalmari',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ];
    test('author with most blog posts when there are multiple posts', () => {
        const result = listHelper.mostBlogs(listWithBlogPosts);
        expect(result.blogs).toBe(3);
    });

    const listWithOneBlogPost = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('author with most blog posts when there is one post', () => {
        const result = listHelper.mostBlogs(listWithOneBlogPost);
        expect(result.blogs).toBe(1);
    });
});

describe('author with most likes', () => {
    const listWithBlogPosts = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Second blog post',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 20,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Third blog post',
            author: 'Erkki Esimerkki',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Fourth blog post',
            author: 'Erkki Esimerkki',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Fifth blog post',
            author: 'Erkki Esimerkki',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1123',
            title: 'Sixth blog post',
            author: 'Lassi Jalmari',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ];
    test('author with most likes when there are multiple posts', () => {
        const result = listHelper.mostLikes(listWithBlogPosts);
        expect(result.likes).toBe(30);
    });

    const listWithOneBlogPost = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('author with most likes when there is one post', () => {
        const result = listHelper.mostLikes(listWithOneBlogPost);
        expect(result.likes).toBe(5);
    });
});