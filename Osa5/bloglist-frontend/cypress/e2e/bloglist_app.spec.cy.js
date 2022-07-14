describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testaaja',
      name: 'Timo Estaaja',
      password: 'salami'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      username: 'vihollinen',
      name: 'Valtteri Ihollinen',
      password: 'nakki'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')

  })
  describe('login', function() {

    it('fails with wrong password', function(){
      cy.get('#username').type('testaaja')
      cy.get('#password').type('lauantaimakkara')
      cy.get('#login-button').click()

      cy.get('.errorMessage').should('contain','wrong credentials')
      cy.get('.errorMessage').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
    it('succeeds with right credentials', function(){
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salami')
      cy.get('#login-button').click()

      cy.get('.message').should('contain','Login successful')

    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password:'salami' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('we need to talk about testaajas behavioiur')
      cy.get('#author').type('testaajas mom')
      cy.get('#blogUrl').type('http://www.amIinTrouble.com')
      cy.get('#create-Button').click()

      cy.contains('we need to talk about testaajas behavioiur')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'no we don not',
          author: 'testaaja',
          url: 'http://www.hiding.com',
          likes: '0'
        })
      })

      it('can be liked', function (){
        cy.get('#details-button').click()
        cy.contains('Likes 0')
        cy.get('#like-button').click()
        cy.contains('Likes 1')
      })

      it('can be deleted', function (){
        cy.get('#details-button').click()
        cy.contains('no we don not').should('exist')
        cy.get('#delete-button').click()
        cy.contains('no we don not').should('not.exist')
      })

      it('can not be deleted by another user', function (){
        cy.get('#logout-button').click()
        cy.get('#username').type('vihollinen')
        cy.get('#password').type('nakki')
        cy.get('#login-button').click()
        cy.get('.message').should('contain','Login successful')
        cy.get('#details-button').click()
        cy.get('#delete-button').should('not.exist')
      })
    })
    describe('and several blogs exist', function (){
      beforeEach(function (){
        cy.createBlog({
          title: 'I am the first blog',
          author: 'testaaja',
          url: 'http://www.hiding.com',
          likes: '1'
        })
        cy.createBlog({
          title: 'I should be Second blog, but am first cause I have one million likes',
          author: 'testaaja',
          url: 'http://www.hiding.com',
          likes: '1000000'

        })

        cy.createBlog({
          title: 'Third Blog also exists',
          author: 'testaaja',
          url: 'http://www.hiding.com',
          likes: '3'
        })
      })

      it('blogs are ordered by likes', function (){
        /*This takes advantage of the fact that the details-button clicked
        is always the details button of the first shown blog */

        cy.get('#details-button').click()
        cy.contains('Likes 1000000')
        cy.createBlog({
          title: 'I am a new blog but wont go first cause I have only seven likes',
          author: 'testaaja',
          url: 'http://www.hiding.com',
          likes: '7'
        })
        cy.get('#details-button').click()
        cy.contains('Likes 1000000')
        cy.createBlog({
          title: 'I am a new blog and will go first cause I have million and one likes',
          author: 'testaaja',
          url: 'http://www.hiding.com',
          likes: '1000001'
        })
        cy.get('#details-button').click()
        cy.contains('Likes 1000001')
      })
    })
  })
})


