const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe('Appointments', () => {

  beforeEach(() => {
    cy.request("GET","/api/debug/reset");
    cy.visit('/');
    cy.contains("[data-testid = day]","Monday");
  })

  it('should book an interview', () => {
    //find the add button
    cy.get("[alt=Add]")
      .first()
      .click();

    //type the input
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
      
    //select the interviewer
    cy.get(":nth-child(1) > .interviewers__item-image") 
      .click();
      
    //clicks save
    cy.contains("Save").click();  

    //check if the item is saved
    cy.contains(".appointment__card--show","Lydia Miller-Jones");
    cy.contains(".appointment__card--show","Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //find the Edit button and click on it    
    cy.contains(".appointment__card--show","Archie Cohen")
    .find("[alt=Edit]")
    .click({force : true});

    //clear the input and edit it
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");    

    //select the second interviewer from the list  
    cy.get(":nth-child(2) > .interviewers__item-image") 
      .click();

     //clicks save
    cy.contains("Save").click();  
    
    //check if the item is updated
    cy.contains(".appointment__card--show","Lydia Miller-Jones");
    cy.contains(".appointment__card--show","Tori Malcolm");
  })

  it("should cancel an interview", () => {
    //find the delete button and click on it
    cy.contains(".appointment__card--show","Archie Cohen")
    .find("[alt=Delete]")
    .click({force : true});

    //click the confirm button
    cy.contains("Confirm").click();

    //check if the item is deleted
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist")
    cy.contains(".appointment__card--show","Archie Cohen").should("not.exist");
  })

})