import React from "react"

function ContactItem(props){
    return(
        <li id={props.id}>
            <span>
                <strong>{props.name}</strong><br />
                {props.phone}
            </span>
            <div className="buttons-holder">
                <button className="edit-button"></button>
                <button className="delete-button" onClick={() => {props.deleteContact(props.id)}}></button>
            </div>
        </li>
    )
}

export default ContactItem