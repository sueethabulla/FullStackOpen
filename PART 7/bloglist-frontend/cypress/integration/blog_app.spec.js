describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')

		const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

	})
	

	it('Login form is shown', function() {
		// ...
		cy.contains('login')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
			// ...
			cy.get('#username').type('Zoro')
			cy.get('#password').type('sword')
			cy.get('#login-button').click()
			cy.contains('Zoro logged-in')
    })

    it('fails with wrong credentials', function() {
			// ...
			cy.get('#username').type('Zoro')
			cy.get('#password').type('word')
			cy.get('#login-button').click()
			cy.get('.error').contains('Wrong credentials')
    })
	})

	describe.only('When logged in', function() {
    beforeEach(function() {
			// log in user here
			cy.login({ username: 'Zoro', password: 'sword' })
			cy.contains('Zoro logged-in')
		})
		
		it('A blog can be created -> like -> delete the blog,', function() {
			cy.contains('new note').click()
			cy.get('#title').type('some title')
      cy.get('#author').type('nisko')
			cy.get('#url').type('www.chinisko.com')
			cy.get('#create-button').click()
			cy.contains('View').click()
			cy.contains('like').click()
      cy.contains('21')
      cy.contains('delete').click()
		})

    it('order by like', function() {

			cy.createBlog('title1','author1', 'www.url.com', 2)
			cy.createBlog('first','author1', 'www.url.com', 1)
			cy.createBlog('title2','author1', 'www.url.com', 7)

		})
  })

})