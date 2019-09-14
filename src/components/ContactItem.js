import React from "react"

function ContactItem(props){
    if( props.visibility === true ) {
        return(
            <li id={props.id}>
                <span>
                    <strong>{props.name}</strong><br />
                    {props.phone}
                </span>
                <div className="buttons-holder">
                    <button className="edit-button" style={{display: "none"}}></button>
                    <button className="delete-button" onClick={() => {props.deleteContact(props.id)}}></button>
                </div>
            </li>
        )
    } else {
        return null
    }
}

export default ContactItem