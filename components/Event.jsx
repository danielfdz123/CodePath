import React from "react";

const Event = (props) => {
    return (
        <div className="eventCard">
            <h1> {props.team1} Vs. {props.team2} </h1>
            <p className = "eventInfo"> {props.date} <br></br>{props.time} </p>
        </div>
    );
};

export default Event;
