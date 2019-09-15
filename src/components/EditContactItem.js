import React from "react"

class EditContactItem extends React.Component{
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
        this.props.saveContact({
            id: this.props.id,
            name:this.state.name,
            phone:this.state.phone
        });
        this.setState({
            name: "",
            phone: "",
        })
    }

    render(){
        const editBox = this.props.status === true ? 'show' : 'hide';
        
        return(
            <section className={editBox}>
                <header>
                    <h3>Edit contact</h3>
                    <button id="toggle" onClick={this.props.control}>X</button>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" defaultValue={this.props.name} onChange={this.handleChange} required />
                    <input type="tel" id="phone" defaultValue={this.props.phone} onChange={this.handleChange} required />
                    <button>Save</button>
                </form>
            </section>
        )
    }
}

export default EditContactItem