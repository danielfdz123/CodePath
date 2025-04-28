import React from "react";

const Event = (props) => {
    return (
        <div className="eventCard">
            <img className = "flag" src={"/images/" + props.team1.toLowerCase() + ".webp"}/>
            <img className = "flag" src={"/images/" + props.team2.toLowerCase() + ".webp"}/>
            <h2> {props.team1} Vs. {props.team2} </h2>
            <p class = "info"> <b class = "location"> 🏟️ {props.venue} <br></br>📍 {props.location} </b> <br></br> ⏰ {props.date} at {props.time} </p>
            <a href = {props.tickets}>
                <button className = "link"> Get Tickets!</button>
            </a>
        </div>
    );
};

export default Event;