import React, { Component } from "react";
import '../style/Login.css';

class Register extends Component {
    constructor(props) {
      super(props);

      this.state ={
        username: ""
      }

      this.register = this.register.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    render(){
        return (
            <div>
                <h1>Password Reset</h1>
                <form className="login_form" onSubmit={this.register}>
                <input className="inputForm" type="email" autoComplete="username"
                 placeholder="Email" name="username" required onChange={this.handleInputChange}/>
                <br />
                <input type="submit" placeholder="Log In" name="submit" className="loginButton"/>
                <br />
                </form>
            </div>
        );
    }

    // Doesn't do anything in Phase 2
    register(e){
      e.preventDefault(); // Prevents auto page refresh
      alert("Password Reset!");
    }

    handleInputChange(event){
      this.setState({[event.target.name]: event.target.value});
    }
}

export default Register;
