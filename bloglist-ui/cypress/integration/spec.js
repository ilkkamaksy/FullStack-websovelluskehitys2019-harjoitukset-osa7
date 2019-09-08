describe('Blog ', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Erkki Esimerkki',
            username: 'erkkiesim',
            password: 'salaisuus'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function() {
        cy.contains('Simple blog app');
    });

    it('login form can be opened', function() {
        cy.get('.toggle-login')
            .click();
        cy.get('[data-cy=username]')
            .type('erkkiesim');
        cy.get('[data-cy=pw]')
            .type('salaisuus');
        cy.get('[data-cy=login]')
            .click();
        cy.contains('Logged in as Erkki Esimerkki');
    });

    describe('when logged in', function() {
        beforeEach(function()  {
            cy.get('.toggle-login')
                .click();
            cy.get('[data-cy=username]')
                .type('erkkiesim');
            cy.get('[data-cy=pw]')
                .type('salaisuus');
            cy.get('[data-cy=login]')
                .click();
        });

        it('name of the user is shown', function() {
            cy.contains('Logged in as Erkki Esimerkki');
        });

        it('a new blog post can be created', function() {
            cy.contains('Create a new blog post')
                .click();
            cy.get('[data-cy=blog-title]')
                .type('a new testing blog');
            cy.get('[data-cy=blog-author]')
                .type('cypress');
            cy.get('[data-cy=blog-url]')
                .type('testing-url');
            cy.get('[data-cy=create-blog]')
                .click();
            cy.contains('a new blog post');
        });

        it('a blog post can be voted', function() {
            cy.contains('Create a new blog post')
                .click();
            cy.get('[data-cy=blog-title]')
                .type('a new testing blog');
            cy.get('[data-cy=blog-author]')
                .type('cypress');
            cy.get('[data-cy=blog-url]')
                .type('testing-url');
            cy.get('[data-cy=create-blog]')
                .click();
            cy.get('[data-cy=blog-link]')
                .click();
            cy.get('[data-cy=blog-like]')
                .click();
            cy.contains('liked');
        });

        it('a blog post can be commented', function() {
            cy.contains('Create a new blog post')
                .click();
            cy.get('[data-cy=blog-title]')
                .type('a new testing blog');
            cy.get('[data-cy=blog-author]')
                .type('cypress');
            cy.get('[data-cy=blog-url]')
                .type('testing-url');
            cy.get('[data-cy=create-blog]')
                .click();
            cy.get('[data-cy=blog-link]')
                .click();
            cy.get('[data-cy=comment]')
                .type('testing commenting');
            cy.get('[data-cy=add-comment]')
                .click();
            cy.contains('your comment was added');
        });

        it('a blog post can be removed', function() {
            cy.contains('Create a new blog post')
                .click();
            cy.get('[data-cy=blog-title]')
                .type('a new testing blog');
            cy.get('[data-cy=blog-author]')
                .type('cypress');
            cy.get('[data-cy=blog-url]')
                .type('testing-url');
            cy.get('[data-cy=create-blog]')
                .click();
            cy.get('[data-cy=blog-link]')
                .click();
            cy.get('[data-cy=remove-blog]')
                .click();
            cy.contains('removed');
        });

        it('users and their posts can be seen in users page', function() {
            cy.contains('Create a new blog post')
                .click();
            cy.get('[data-cy=blog-title]')
                .type('a new testing blog');
            cy.get('[data-cy=blog-author]')
                .type('cypress');
            cy.get('[data-cy=blog-url]')
                .type('testing-url');
            cy.get('[data-cy=create-blog]')
                .click();
            cy.get('[data-cy=nav-item-users]')
                .click();
            cy.contains('Blogs created');
            cy.contains('Erkki Esimerkki');
        });
    });
});