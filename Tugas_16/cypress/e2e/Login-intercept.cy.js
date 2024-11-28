/// <reference types="cypress" />

describe('Login Feature',() => {
    beforeEach(()=> {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('should successfully login with valid credentials', () => {
        cy.intercept('/web/index.php/auth/login').as('loginRequest');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[class ="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard');
    });
  
  
    it('should display an error for invalid credentials', () => {
      cy.intercept('/web/index.php/auth/login').as('loginRequest'); 
      cy.get('[name="username"]').type('User');
      cy.get('[name="password"]').type('admin123');
      cy.get('[type="submit"]').click();
      cy.get('[class="oxd-alert-content oxd-alert-content--error"]').should('have.text', 'Invalid credentials');
     
    });
  
    it('should display an error for empty username', () => {
      cy.intercept('/web/index.php/auth/login').as('loginRequest');
      cy.get('[name="password"]').type('admin123');
      cy.get('[type="submit"]').click();
      cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text', 'Required');
    });
  
    it('should display an error for empty password', () => {
        cy.intercept('/web/index.php/auth/login').as('loginRequest');
        cy.get('[name="username"]').type('Admin');
        cy.get('[type="submit"]').click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text', 'Required');
    });
})