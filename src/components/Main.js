import React from "react"
import Search from "./Search"
import ContactItem from "./ContactItem"
import AddContactItem from "./AddContactItem"


class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contacts: [],
            modalActive: false
        }
    }
    handleInput = (keyword) => {
        this.setState(prevState => {
            const filterdItems = prevState.contacts.filter(item => {
                return item.name.toLowerCase().includes(keyword.toString().toLowerCase())
            })
            return {
                contacts: filterdItems
            }
        })
    }
    addContact = (contact) => {
        let contacts = [...this.state.contacts, contact]
        this.setState({
            contacts: contacts
        })
    }
    deleteContact = (id) => {
        let contacts = this.state.contacts.filter(item => { return item.id !== id })
        this.setState({
            contacts: contacts
        })
    }
    toggleModal = () => {
        this.setState({
            modalActive: !this.state.modalActive
        })
    }
    componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    contacts: data
                })
            })
        // .then(console.log(this.state))
    }

    render() {
        const contacts = this.state.contacts.sort(
            (a, b) => (a.name > b.name) ? 1 : -1)
            .map(contact => {
                return (
                    <ContactItem
                        key={contact.id}
                        id={contact.id}
                        name={contact.name}
                        phone={contact.phone}
                        deleteContact={this.deleteContact}
                    />
                )
            })
        return (
            <div id="main" className="card">
                <header>
                    <Search handleInput={this.handleInput} />
                </header>

                <div id="contacts">
                    <ul>
                        {contacts}
                    </ul>
                </div>

                <div className="footer">
                    <span>Number of contacts: {this.state.contacts.length}</span>

                    <button id="add-contact" type="submit" onClick={this.toggleModal}>+</button>
                </div>
                <AddContactItem addContact={this.addContact} status={this.state.modalActive} control={this.toggleModal} />
            </div>
        )
    }
}


export default Main