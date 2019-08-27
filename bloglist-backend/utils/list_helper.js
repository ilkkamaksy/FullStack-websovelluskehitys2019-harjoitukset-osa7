const dummy = (blogs) => {
    console.log(blogs);
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (acc, cur) => {
        return acc + cur.likes;
    };

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    let mostLikedPost = blogs[0];
    for ( let i = 1; i < blogs.length; i++ ) {
        if ( blogs[i].likes > mostLikedPost.likes ) {
            mostLikedPost = blogs[i];
        }
    }
    return mostLikedPost;
};

const mostBlogs = (blogs) => {
    let authorsAndPostCount = {};
    for ( let i = 0; i < blogs.length; i++) {
        let currentAuthor = blogs[i].author;
        authorsAndPostCount[currentAuthor] = !authorsAndPostCount[currentAuthor] ? 1 : authorsAndPostCount[currentAuthor] += 1;
    }

    const reducer = (a,b) => {
        return authorsAndPostCount[a] > authorsAndPostCount[b] ? a : b;
    };

    const authorWithMostBlogPosts = Object.keys(authorsAndPostCount).reduce(reducer);

    return { author: authorWithMostBlogPosts, blogs: authorsAndPostCount[authorWithMostBlogPosts] };
};

const mostLikes = (blogs) => {
    let authorsLikes = {};
    for(let i = 0; i < blogs.length; i++) {
        authorsLikes[blogs[i].author] = !authorsLikes[blogs[i].author] ? blogs[i].likes : authorsLikes[blogs[i].author] += blogs[i].likes;
    }

    const reducer = (a,b) => {
        return authorsLikes[a] > authorsLikes[b] ? a : b;
    };

    const authorWithMostLikes = Object.keys(authorsLikes).reduce(reducer);

    return { author: authorWithMostLikes, likes: authorsLikes[authorWithMostLikes] };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};