import React from "react"
import Search from "./Search"
import ContactItem from "./ContactItem"
import AddContactItem from "./AddContactItem"


class Main extends React.Component{
    constructor(props){
        super(props)

        this.state={
            contacts: [],
            modalActive: false
        }
    }
    handleSearch = (keyword) => {
        const filterdItems = this.state.contacts.filter( item => {
            return item.name.toLowerCase().includes( keyword.toString().toLowerCase() )
        } )
        filterdItems.map( item => {
            return item.visibility = "true"
        } )
        this.setState({
            contacts: filterdItems
        })
    }
    addContact = (contact) => {
        // Sending data
        fetch("http://localhost:3004/contacts", {
            method: 'POST',
            body: JSON.stringify(contact),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .then(()=> {
            this.fetchContacts();
            this.setState({ modalActive: false });
        })
        .catch(error => console.error('Error:', error));
    }
    deleteContact = (id) => {
        fetch("http://localhost:3004/contacts/" + id, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .then(() => this.fetchContacts())
        .catch(error => console.error('Error:', error));
    }
    toggleModal = () => {
        this.setState({
            modalActive : !this.state.modalActive
        })
    }
    fetchContacts = () => {
        fetch("http://localhost:3004/contacts")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    contacts: data,
                })
            })
    }
    componentDidMount() {
        this.fetchContacts();    
    }
    render(){
        const contacts = this.state.contacts.sort( (a, b) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        }).map(contact => {
            return(
                <ContactItem 
                    key={contact.id}
                    id={contact.id} 
                    name={contact.name} 
                    phone={contact.phone}
                    visibility={contact.visibility}
                    deleteContact={this.deleteContact}
                />
            )
        })
        return(
            <div id="main" className="card">
                <header>
                    <Search handleSearch={this.handleSearch} />
                </header>

                <div id="contacts">
                    <ul>                        
                        { contacts }
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