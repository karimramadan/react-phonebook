import React from "react"
import Search from "./Search"
import ContactItem from "./ContactItem"
import EditContactItem from "./EditContactItem"
import AddContactItem from "./AddContactItem"


class Main extends React.Component{
    constructor(props){
        super(props)

        this.state={
            contacts: [],
            editId: "",
            editName: "",
            editPhone: "",
            isLoading: true,
            addModalActive: false,
            editModalActive: false
        }
    }
    handleSearch = (keyword) => {
        const filterdItems = this.state.contacts;
        filterdItems.forEach( item => {           
            if( !item.name.toLowerCase().includes( keyword.toString().toLowerCase() ) ) {
                return item.visibility = false
            } else {
                return item.visibility = true
            }
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
            this.toggleAddModal();
        })
        .catch(error => console.error('Error:', error));
    }
    editContact = (id, name, phone) => {
        console.log(id, name, phone)
        this.toggleEditModal();
        this.setState({
            editId: id,
            editName: name,
            editPhone: phone,
        })
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
    saveContact = (contact) => {
        console.log(contact.id)
        const name = contact.name;
        const phone = contact.phone;
        fetch("http://localhost:3004/contacts/" + contact.id, {
            method: 'PATCH',
            body: JSON.stringify({name, phone}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .then(()=> {
            this.fetchContacts();
            this.toggleEditModal();
        })
        .catch(error => console.error('Error:', error));
    }
    toggleAddModal = () => {
        this.setState({
            addModalActive : !this.state.addModalActive
        })
    }
    toggleEditModal = () => {
        this.setState({
            editModalActive : !this.state.editModalActive
        })
    }
    fetchContacts = () => {
        fetch("http://localhost:3004/contacts")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    contacts: data,
                })
            })
    }
    componentDidMount() {
        this.fetchContacts();    
    }
    render(){
        let loading = this.state.isLoading ? "Loading" : null;
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
                    editContact={this.editContact}
                    deleteContact={this.deleteContact}
                />
            )
        })
        return(
            <div id="main" className="card">
                <header>
                    <Search handleSearch={this.handleSearch} />
                </header>

                <div id="contacts" className={loading} >
                    <ul>
                        { contacts  }
                    </ul>
                </div>

                <div className="footer">
                    <span>Number of contacts: {this.state.contacts.length}</span>
                    <button id="add-contact" type="submit" onClick={this.toggleAddModal}>+</button>
                </div>
                <EditContactItem editContact={this.editContact} saveContact={this.saveContact} id={this.state.editId} name={this.state.editName} phone={this.state.editPhone} status={this.state.editModalActive} control={this.toggleEditModal} />
                <AddContactItem addContact={this.addContact} status={this.state.addModalActive} control={this.toggleAddModal} />
            </div>            
        )
    }
}

export default Main