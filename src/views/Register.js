import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import '../style/Login.css';

class Register extends Component {
    constructor(props) {
      super(props);

      this.state ={
        name: "",
        username: "",
        pw: "",
        repeat: ""
      }

      this.register = this.register.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    render(){
        return (
            <div>
                <h1>Register</h1>
                <form className="login_form" onSubmit={this.register}>
                  <input className="inputForm" type="text" autoComplete="name"
                   placeholder="Name" name="name" required onChange={this.handleInputChange}/>
                  <br />
                  <input className="inputForm" type="email" autoComplete="username"
                   placeholder="Email" name="username" required onChange={this.handleInputChange}/>
                  <br />
                  <input className="inputForm" type="password" autoComplete="new-password"
                  placeholder="Password" name="pw" required onChange={this.handleInputChange}/>
                  <br />
                  <input className="inputForm" type="password" autoComplete="new-password"
                  placeholder="Repeat Password" name="repeat" required onChange={this.handleInputChange}/>
                  <br />
                  <input type="submit" placeholder="Log In" name="submit" className="loginButton"/>
                  <br />
                  <div>
                      <p>
                       Already have an account? <NavLink to="/login" className="pwHelp">Log in here</NavLink>
                      </p>
                  </div>
                </form>
            </div>
        );
    }

    // Doesn't do anything in Phase 2
    register(e){
      e.preventDefault(); // Prevents auto page refresh
      alert("Register");
    }

    handleInputChange(event){
      this.setState({[event.target.name]: event.target.value});
    }
}

export default Register;
