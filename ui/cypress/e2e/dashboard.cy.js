describe('User Profile Tests', () => {
  beforeEach(() => {
    // Log in to the application before running the tests
    cy.visit('http://localhost:3001/'); // Visit the landing page
    cy.get('input[type="email"]').type('test@test.com'); // Input email
    cy.get('input[type="password"]').type('password1!'); // Input password
    cy.get('.login-button').click(); // Click the login button

    // Wait for the dashboard to load
    cy.url().should('include', '/dashboard');
  });


  describe('User Dashboard Tests', () => {
    it('should display user profile fields', () => {
      // Check for the presence of the "Dashboard" heading
      cy.get('h1').contains('Dashboard').should('be.visible');
      // Check for the presence of "User Profile" Heading
      cy.get('h2').contains('User Profile').should('be.visible');
      // Check for the presence of the "Name" field
      cy.get('p').contains('Name:').should('be.visible');
      // Check for the presence of the "Email" field
      cy.get('p').contains('Email:').should('be.visible');
      // Check for the presence of the "Nationality" field
      cy.get('p').contains('Nationality:').should('be.visible');
    });
  
    it('should display upcoming trips fields', () => {
      // Ensure the "Upcoming Trips" heading is visible
      cy.get('h2').contains('Upcoming Trips').should('be.visible');
  
      // Check for the presence of the "Start Date" field
      cy.get('p').contains('Start Date:').should('be.visible');
  
      // Check for the presence of the "End Date" field
      cy.get('p').contains('End Date:').should('be.visible');
  
      // Check for the presence of the "Countries" field
      cy.get('p').contains('Countries:').should('be.visible');
    });
  });
  
});
