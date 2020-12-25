Cypress.Commands.add('createBlog', ({ author, title, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { author, title, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Janetsqy',
      username: 'janetsqy',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.request('GET', 'http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('janetsqy')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Login Succesful')
    })

    it('fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('janetsqy')
      cy.get('#password').type('nauraa')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'janetsqy', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.get('#new-button').click()
      cy.get('#author').type('authori')
      cy.get('#title').type('otsikko')
      cy.get('#url').type('http://urli')
      cy.get('#create-button').click()
      cy.contains('A new blog otsikko by authori')
    })


    describe('when blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'otsikko',
          author: 'authori',
          url: 'http://localhost2',
          likes: '24'
        })
      })
      it('A blog can liked', function () {
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('#likeamount').should('contain', 'likes 25')
        cy.visit('http://localhost:3000')
        //double check that database has been updated
        cy.get('#view').click()
        cy.get('#likeamount').should('contain', 'likes 25')
      })

      it('A blog can be deleted', function () {
        cy.get('#view').click()
        cy.get('#delete').click()
        cy.on('window:confirm', function() {return true})
        cy.contains('Deleted blog otsikko by authori')
      })

      it('Blogs are sorted by likes', function () {
        cy.createBlog({
          title: 'otsikko2',
          author: 'authori2',
          url: 'http://localhost2',
          likes: '23'
        })
        cy.createBlog({
          title: 'otsikko3',
          author: 'authori3',
          url: 'http://localhost2',
          likes: '22'
        })
        //cy.get('#view').click()
        cy.visit('http://localhost:3000')
        const likes = []
        cy.get('.likeamount').each($elem => {
          //cy.log($elem.text().split(' ')[1] + 'nauraa')
          likes.push(parseInt($elem.text().split(' ')[1]))
        }).then(() => {
          const sortedLikes = [...likes].sort((a, b) => b - a)
          expect(likes).to.be.ordered.members(sortedLikes)
        })
      })

    })

  })

})