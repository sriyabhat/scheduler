import React, { useState, useEffect }  from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "../../hooks/useVisualMode";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) { 
  const {mode,transition,back} = useVisualMode(
    (props.interview) ? SHOW : EMPTY
  );

  const [edit,setEdit] = useState(false);
  useEffect(()=>{
    if(mode === EDIT){
      setEdit(true);
    }
  })
  
  

  const save = (name,interviewer) => {
    transition(SAVING);
    const interview = {
      student : name,
      interviewer
    };
    props.bookInterview(props.id,interview,edit)
    .then((response)=>{      
      transition(SHOW);
    })
    .catch(error => {
      transition(ERROR_SAVE);
    })     
  } 
  
  const deleteInterview = () => {
    transition(DELETING,true);
    props.deleteInterview(props.id)
    .then((response) => {
      transition(EMPTY);    
    })
    .catch(error => {
      transition(ERROR_DELETE,true);
    })
  }
  
  
  return (
    <article className = "appointment" data-testid="appointment">
      <Header time = {props.time}/>   
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)}/>}  
      {mode === SHOW && <Show student = {props.interview.student} interviewer = {props.interview.interviewer.name} onEdit = {() => {transition(EDIT)}} onDelete = {() => {transition(CONFIRM)}}/>}
      {mode === CREATE && <Form interviewers = {props.interviewers} onSave = {save} onCancel = {() => back()}/>}
      {mode === SAVING && <Status message = "Saving" />}
      {mode === DELETING && <Status message = "Deleting" />}
      {mode === CONFIRM && <Confirm message = "Are you sure you would like to delete?" onCancel = {() => back()} onConfirm = {deleteInterview}/>}
      {mode === EDIT && <Form name = {props.interview.student} interviewers = {props.interviewers} interviewer = {props.interview.interviewer.id} onSave = {save} onCancel = {() => back()}/>}
      {mode === ERROR_DELETE && <Error message = "Could not cancel appointment." onClose = {() => {back()}}/>}
      {mode === ERROR_SAVE && <Error message = "Could not save appointment." onClose = {() => {back()}}/>}
    </article>
  );
}