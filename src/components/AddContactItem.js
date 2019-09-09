import React from "react"

class AddContactItem extends React.Component{
    state = {
        id: Math.random(),
        name: null,
        phone: null,
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addContact(this.state)
    }
    render(){
        const addBox = this.props.status === true ? 'show' : 'hide';
        
        return(
            <section className={addBox}>
                <header>
                    <h3>Add new contact</h3>
                    <button id="toggle" onClick={this.props.control}>X</button>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" placeholder="Name" onChange={this.handleChange} />
                    <input type="tel" id="phone" placeholder="Phone number" onChange={this.handleChange} />
                    <button>Add</button>
                </form>
            </section>
        )
    }
}

export default AddContactItem