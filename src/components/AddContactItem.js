import React from "react"

class AddContactItem extends React.Component{
    state = {
        name: "",
        phone: "",
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addContact({
            id: Math.random().toString(36).substring(2) + Date.now().toString(36),
            visibility: "show",
            name:this.state.name,
            phone:this.state.phone
        });
        this.setState({
            name: "",
            phone: "",
        })
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
                    <input type="text" id="name" placeholder="Name *" value={this.state.name} onChange={this.handleChange} required />
                    <input type="tel" id="phone" placeholder="Phone number *" value={this.state.phone} onChange={this.handleChange} required />
                    <button>Add</button>
                </form>
            </section>
        )
    }
}

export default AddContactItem