import React from "react";
import PropTypes from "prop-types"
import "components/InterviewerList.scss";

import InterViewerListItem from "components/InterviewerListItem.js";

function InterviewerList(props) {  

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

InterviewerList.propTypes = {
  interviewers : PropTypes.array.isRequired
}
export default InterviewerList;