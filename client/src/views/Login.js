import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import '../style/Login.css';

class Login extends Component {
    constructor(props) {
      super(props);

      this.state ={
        username: "",
        pw: "",
        remember: false
      }

      this.logIn= this.logIn.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    render(){
        return (
            <div>
                <h1>Log In</h1>
                <form className="login_form" onSubmit={this.logIn}>
                  <input className="inputForm" type="email" autoComplete="username"
                   placeholder="Email" name="username" required onChange={this.handleInputChange}/>
                  <br />
                  <input className="inputForm" type="password" autoComplete="current-password"
                   placeholder="Password" name="pw" required onChange={this.handleInputChange}/>
                  <br />
                  <input type="submit" placeholder="Log In" name="submit" className="loginButton"/>
                  <br />
                  <label>
                    <input type="checkbox" checked={this.state.remember} name="remember"
                    onChange={this.handleInputChange}/> Remember me
                  </label>
                  <div>
                      <p> No account? <NavLink to="/register" className="pwHelp">Sign up here</NavLink></p>
                      <div className="forget">
                          <NavLink to="/reset" className="pwHelp">Forgot password?</NavLink>
                      </div>
                  </div>
                </form>
            </div>
        );
    }

    // Logs the user in
    logIn(e){
      e.preventDefault(); // Prevents auto page refresh
      fetch('api/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.pw
        })
      })
      .then(response => {
        if (response.ok) {
          alert('Logged In');
        } else {
          throw new Error("Log in Failed");
        }
      });
    }

    // From the react docs
    handleInputChange(event){
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      this.setState({[event.target.name]: value});
    }
}

export default Login;
