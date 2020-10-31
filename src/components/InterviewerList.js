import React from "react";
import "components/InterviewerList.scss";

import InterViewerListItem from "components/InterviewerListItem.js";

export default function InterviewerList(props) {  

  

  const interviewList = props.interviewers.map((item) => {
    return (
      <InterViewerListItem 
        key = {item.id}        
        name = {item.name} 
        avatar = {item.avatar} 
        selected = {item.id === props.interviewer}
        setInterviewer = {(event) => props.setInterviewer(item.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewList}
      </ul>
    </section>
  );
}
