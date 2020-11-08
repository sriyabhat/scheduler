import React from "react";

import { render, cleanup, waitForElement,fireEvent, getByText,getAllByTestId, prettyDOM, getByPlaceholderText, getByAltText,queryByText, waitForElementToBeRemoved, getByTestId } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios"



afterEach(cleanup);


describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application/>);
    await waitForElement(() => getByText("Monday"));  
    fireEvent.click(getByText("Tuesday"));  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const {container,debug} = render(<Application/>);  

    await waitForElement(() => getByText(container,"Archie Cohen"));    
    const appointment = getAllByTestId(container,"appointment")[0];

    fireEvent.click(getByAltText(appointment,"Add"));  

    fireEvent.change(getByPlaceholderText(appointment,/enter student name/i),{
      target :{value: "Lydia Miller-Jones"}});   
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment,"Save"));  

    expect(getByText(appointment,"Saving")).toBeInTheDocument();     
    
    await waitForElement(() => queryByText(appointment,"Lydia Miller-Jones"))    
   
    const day = getAllByTestId(container,"day").find(day => queryByText(day,"Monday"));
    
    expect(queryByText(day, "no spots remaining")).not.toEqual(null)
  }); 


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1",async() => {  
    const {container,debug} = render(<Application/>);    
    
    await waitForElement(() => queryByText(container,"Archie Cohen"))
    //debug();
    const appointment = getAllByTestId(container,"appointment")
      .find(appointment => queryByText(appointment,"Archie Cohen"))

    fireEvent.click(getByAltText(appointment,"Delete"));    
    expect(queryByText(appointment,"Are you sure you would like to delete?")).not.toEqual(null);

    fireEvent.click(getByText(appointment,"Confirm"));
    expect(queryByText(appointment,"Deleting")).not.toEqual(null);
 
    await waitForElementToBeRemoved(() =>queryByText(appointment,"Deleting"));
    
    const day = getAllByTestId(container,"day").find(day => getByText(day,"Monday"))    
    
    expect(queryByText(day,"1 spot remaining")).not.toEqual(null);    
  })


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    const {container, debug} = render(<Application/>);
    await waitForElement(() => queryByText(container,"Monday"));
     
    let day = getAllByTestId(container,"day").find(day => getByText(day,"Monday"))
    expect(queryByText(day,"1 spot remaining")).not.toEqual(null);

    const appointment = getAllByTestId(container,"appointment")
      .find(appointment => queryByText(appointment,"Archie Cohen"))    
    fireEvent.click(getByAltText(appointment,"Edit"));
    
    
    expect(getByPlaceholderText(appointment,/enter student name/i)).toBeInTheDocument;

    fireEvent.change(getByPlaceholderText(appointment,/enter student name/i),{
      target :{value: "Sriya Bhat"}});    
    fireEvent.click(getByAltText(appointment,"Tori Malcolm"));
    fireEvent.click(queryByText(appointment,"Save"));
    
    expect(queryByText(appointment,"Saving")).not.toEqual(null);
    await waitForElementToBeRemoved(()=>queryByText(appointment,"Saving"));

    expect(queryByText(appointment,"Sriya Bhat")).not.toEqual(null);
    expect(queryByText(appointment,"Tori Malcolm")).not.toEqual(null);

    day = getAllByTestId(container,"day").find(day => getByText(day,"Monday"))
    expect(queryByText(day,"1 spot remaining")).not.toEqual(null);
  })

  
  
  it("shows the delete error when failing to delete an existing appointment",async() => {
    axios.delete.mockRejectedValueOnce();
    
    const {container,debug} = render(<Application/>);    
    
    await waitForElement(() => queryByText(container,"Archie Cohen"))
    
    const appointment = getAllByTestId(container,"appointment")
      .find(appointment => queryByText(appointment,"Archie Cohen"))
  
    fireEvent.click(getByAltText(appointment,"Delete"));    
    expect(queryByText(appointment,"Are you sure you would like to delete?")).not.toEqual(null);
  
    fireEvent.click(getByText(appointment,"Confirm"));
    expect(queryByText(appointment,"Deleting")).not.toEqual(null);
  
    await waitForElement(() => queryByText(appointment,"Could not cancel appointment."))
    fireEvent.click(getByAltText(appointment,"Close"));
  
    expect(queryByText(container,"Archie Cohen")).not.toEqual(null)
    const day = getAllByTestId(container,"day").find(day => getByText(day,"Monday"))  
    expect(queryByText(day,"1 spot remaining")).not.toEqual(null);    
  })

  it("shows the save error when failing to save an appointment", async() => { 
    
    axios.put.mockRejectedValueOnce();
    const {container,debug} = render(<Application/>);
    
    await waitForElement(() => getByAltText(container,"Add"))   
    const appointment = getAllByTestId(container,"appointment")[0];
    fireEvent.click(getByAltText(appointment,"Add"));  
    fireEvent.change(getByPlaceholderText(appointment,/enter student name/i),{
      target :{value: "Lydia Miller-Jones"}});   
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment,"Save"));  
    expect(getByText(appointment,"Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment,"Could not save appointment."))
    fireEvent.click(getByAltText(appointment,"Close"));
    expect(getByAltText(appointment,"Add"));
    const day = getAllByTestId(container,"day").find(day => queryByText(day,"Monday")); 
    
    expect(queryByText(day, "1 spot remaining")).not.toEqual(null)
  
  });
})

