import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../config/fbconfig';

class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: "",
            message: "",
        }
    }   

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(cred => {
            const uid = cred.user.uid;
            this.props.history.push('/contacts?uid=' + uid)
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
                    <h3>Sign In</h3>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" id="email" placeholder="Email *" required onChange={this.handleChange} />
                    <input type="password" id="password" placeholder="Password *" required onChange={this.handleChange} />
                    <button>Login</button>
                    <p>Don't have an account? {<NavLink to="/signup">Sign up</NavLink>}</p>
                    <div>{this.state.message}</div>
                </form>
            </div>
        )
    }
}

export default Login