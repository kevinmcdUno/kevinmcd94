describe('Landing Page Tests', () => {
    it('should load the landing page', () => {
      cy.visit('http://localhost:3001/'); // Visit the landing page
       // Check if the page contains the exact text "Welcome to Travel Planner"
    cy.contains('h1', 'Welcome to Travel Planner').should('exist'); 
    });
  });

  describe('Check Email Input', () => {
    it('should find the email input inside the .text-box div', () => {
      cy.visit('http://localhost:3001/'); // Adjust the URL if needed
  
      // Check if the div with class "text-box" contains an input with placeholder "Email"
      cy.get('div.text-box input[placeholder="Email"]').should('exist');
    });
  });


  describe('Check Password Input', () => {
    it('should find the email input inside the .text-box div', () => {
      cy.visit('http://localhost:3001/'); // Adjust the URL if needed
  
      // Check if the div with class "text-box" contains an input with placeholder "Email"
      cy.get('div.text-box input[placeholder="Password"]').should('exist');
    });
  });


  describe('Login Form Input and Submit Test', () => {
    it('should input email, password and submit the form', () => {
      cy.visit('http://localhost:3001/'); // Visit your landing page
  
      // Input test@test.com into the email field
      cy.get('div.text-box input[placeholder="Email"]').type('test@test.com');
  
      // Input password1! into the password field
      cy.get('div.text-box input[placeholder="Password"]').type('password1!');
  
      // Add assertions to check that the values are correctly input
      cy.get('div.text-box input[placeholder="Email"]').should('have.value', 'test@test.com');
      cy.get('div.text-box input[placeholder="Password"]').should('have.value', 'password1!');
  
      // Click the submit button
      cy.get('div.button-container button[type="submit"].login-button').click();
      
      // Optionally, you can check for expected behavior after submission, like redirecting to another page or showing an error message
      // e.g., cy.url().should('include', '/dashboard');

          // Assert that we're redirected to the dashboard
    cy.url().should('include', '/dashboard');

    });
  });