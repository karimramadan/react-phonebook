import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../config/fbconfig';

class SignUp extends React.Component{
    state = {
        email: "",
        password: "",
        message: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(cred => {
            const uid = cred.user.uid;
            fetch("https://react-phone-book-project.herokuapp.com/" + uid, {
            method: 'POST',
            })
            .then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .then(() => {
                this.setState({
                    email: "",
                    password: "",
                    message: "Your account has been successfully created"
                })
            })
        })        
        .catch(err => {
            this.setState({
                message: err.message
            })
        });
    }

    render(){
        return (
            <div className="login-box">
                <header>
                    <h3>Sign Up</h3>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <label>Email *</label>
                    <input type="email" id="email" value={this.state.email} required onChange={this.handleChange} />
                    <label>Password *</label>
                    <input type="password" id="password" value={this.state.password} required onChange={this.handleChange} />
                    <button>Sign Up</button>
                    <p>Already have an account? {<NavLink to="/">Sign in</NavLink>}</p>
                    <div>{this.state.message}</div>
                </form>
            </div>
        )
    }
}

export default SignUp