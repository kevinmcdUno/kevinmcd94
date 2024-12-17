describe('Add Trip Tests', () => {
    beforeEach(() => {
      // Log in to the application before running the tests
      cy.visit('http://localhost:3001/'); // Visit the landing page
      cy.get('input[type="email"]').type('test@test.com'); // Input email
      cy.get('input[type="password"]').type('password1!'); // Input password
      cy.get('.login-button').click(); // Click the login button
  
      // Wait for the dashboard to load
      cy.url().should('include', '/dashboard');


    });

    it('should display the "Create New Trip" button', () => {
        // Check that the "Create New Trip" button is present
        cy.contains('button', 'Create New Trip').should('be.visible');
      });
    
      it('should allow the user to create a new trip', () => {
        // Click the "Create New Trip" button
        cy.contains('button', 'Create New Trip').click();
    
        // Verify navigation to the trip creation form
        cy.url().should('include', '/add-trip');
    
     // Fill out the form
     cy.contains('label', 'Trip Name:')
     .next('input') // Target the input immediately following the label
     .type('Summer Hols'); // Trip Name

     cy.contains('label', 'Description:')
     .next('input')
     .type('Italy Holiday'); // Description

   cy.contains('label', 'Start Date:')
     .next('input')
     .type('2024-12-01'); // Start Date

   cy.contains('label', 'End Date:')
     .next('input')
     .type('2024-12-15'); // End Date


    
        // Submit the form
        cy.get('.save-button').click(); // Click the login button
    
        // Verify success message or redirection back to dashboard
        cy.contains('p', 'Trip added successfully').should('be.visible'); // Success message
      });
    });
  