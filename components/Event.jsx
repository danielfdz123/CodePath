import React from "react";

const Event = (props) => {
    return (
        <div className="event-card">
            <h1> {props.team1} Vs. {props.team2} </h1>
            <h3> {props.time}</h3>
        </div>
    );
};

export default Event;
