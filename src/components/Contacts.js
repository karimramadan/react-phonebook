import React from "react"
import Search from "./Search"
import ContactItem from "./ContactItem"
import AddContactItem from "./AddContactItem"
import firebase from '../config/fbconfig';

class Main extends React.Component{
    constructor(props){
        super(props)

        this.state={
            currentUserUid: null,
            contacts: [],
            isLoading: true,
            addModalActive: false
        }
    }
    getCurrentUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    currentUserUid: user.uid,
                    isLoading: false,
                })
                this.fetchContacts();
            } else {
                console.log('You\'r not authorized to load contacts')
            }
        })
    }
    handleClick = () => {
        fetch("https://simple-express-server-project.herokuapp.com/sessionLogout", {
            method: 'POST',
        })
        .then( this.props.history.push('/') )
        .catch(error => console.error('Error:', error));
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
        fetch("https://simple-express-server-project.herokuapp.com/contacts?uid=" + this.state.currentUserUid, {
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
    saveContact = (contact) => {
        let {id, name, phone, visibility} = contact;
        fetch("https://simple-express-server-project.herokuapp.com/contacts?uid=" + this.state.currentUserUid + '&id=' + id, {
            method: 'PUT',
            body: JSON.stringify({id, name, phone, visibility}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .then(()=> {
            this.fetchContacts();
        })
        .catch(error => console.error('Error:', error));
    }
    deleteContact = (id) => {
        fetch("https://simple-express-server-project.herokuapp.com/contacts?uid=" + this.state.currentUserUid + '&id=' + id, {
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
    toggleAddModal = () => {
        this.setState({
            addModalActive : !this.state.addModalActive
        })
    }
    fetchContacts = () => {
        fetch("https://simple-express-server-project.herokuapp.com/contacts?uid=" + this.state.currentUserUid)
        .then(response => response.json())
        .then(data => {
            this.setState({
                isLoading: false,
                contacts: data.contacts,
            })
        })
    }
    componentDidMount() {
        this.getCurrentUser();
    }
    render(){
        let loading = this.state.isLoading ? "loading" : null;
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
                    saveContact={this.saveContact}
                    deleteContact={this.deleteContact}
                />
            )
        })
        return(
            <div id="main" className="card">
                <header>
                    <Search handleSearch={this.handleSearch} />
                    <button onClick={this.handleClick}>Log out</button>
                </header>

                <div id="contacts" className={loading} >
                    <ul>
                        { contacts }
                    </ul>
                </div>

                <div className="footer">
                    <span>Number of contacts: {this.state.contacts.length}</span>
                    <button id="add-contact" type="submit" onClick={this.toggleAddModal}>+</button>
                </div>
                <AddContactItem addContact={this.addContact} status={this.state.addModalActive} control={this.toggleAddModal} />
            </div>            
        )
    }
}

export default Main