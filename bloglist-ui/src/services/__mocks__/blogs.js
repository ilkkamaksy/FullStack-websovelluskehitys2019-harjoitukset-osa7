const blogs = [
    {
        likes: 0,
        title: 'Demo blog post for demo purposes',
        author: 'Ilkka Mäkinen',
        url: 'demo-blog-post-demo-purposes',
        user: {
            username: 'tepitesti',
            name: 'Teppo Testaaja',
            id: '5d2c63a1cac5502f481b95d4'
        },
        id: '5d2c72d593336c4f9021c523'
    },
    {
        likes: 0,
        title: 'Another demo blog post for demo purposes',
        author: 'Ilkka Mäkinen',
        url: 'another-demo-blog-post-demo-purposes',
        user: {
            username: 'tepitesti',
            name: 'Teppo Testaaja',
            id: '5d2c63a1cac5502f481b95d4'
        },
        id: '5d2c734e93336c4f9021c524'
    },
    {
        likes: 0,
        title: 'Just another blog post here',
        author: 'Ilkka Mäkinen',
        url: 'another-blog-post',
        user: {
            username: 'erkkiesim',
            name: 'Erkki Esimerkki',
            id: '5d2c6433cac5502f481b95d5'
        },
        id: '5d2c86abcc7f194a98bc2fcf'
    }
];

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    return Promise.resolve(blogs);
};

export default { getAll, setToken };