import React from "react"

class ContactItem extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            id: this.props.id,
            name: this.props.name,
            phone: this.props.phone,
            isPopup: false
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.saveContact({
            id: this.props.id,
            name:this.state.name,
            phone:this.state.phone,
            visibility: true,
        });
        this.setState({isPopup: !this.state.isPopup});
    }
    handleClick = (event) => {
        event.preventDefault();
        this.setState({isPopup: !this.state.isPopup});
    }
    render(){
        const editBox = this.state.isPopup === true ? 'edit-card active' : 'edit-card';

        if( this.props.visibility === true ) {
            return(
                <li id={this.props.id}>
                    <span>
                        <strong>{this.props.name}</strong><br />
                        {this.props.phone}
                    </span>
                    <div className="buttons-holder">
                        <button className="edit-button" onClick={this.handleClick}></button>
                        <button className="delete-button" onClick={() => {this.props.deleteContact(this.props.id)}}></button>
                    </div>
                    <section className={editBox}>
                        <header>
                            <h3>Edit contact</h3>
                            <button id="toggle" onClick={this.handleClick}>X</button>
                        </header>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="name" defaultValue={this.props.name} onChange={this.handleChange} required />
                            <input type="tel" id="phone" defaultValue={this.props.phone} onChange={this.handleChange} required />
                            <button>Save</button>
                        </form>
                    </section>
                </li>
            )
        } else {
            return null
        }
    }
}

export default ContactItem