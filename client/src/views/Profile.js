import React, { Component } from "react";
import { NavLink, Redirect} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            gifs: []
        };
        this.grabImages = this.grabImages.bind(this);
        this.getSavedGifs = this.getSavedGifs.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }

    componentDidMount(){
      window.scrollTo(0, 0);
      if(localStorage.getItem("isLoggedIn")){
        this.getSavedGifs();
      }
    }

    render () {
      if(!localStorage.getItem("isLoggedIn")){ // If user is not logged in, they can't view their profile
        return <Redirect to='/login'/>;
      }
      this.getUsername();
      var renderedGifs = this.state.gifs.map(function (gif, i){
          return (
            <NavLink to={'/share?gif='+ gif} key={i} className="gifLink">
              <img src={gif} key={i} alt="Gif failed to load" className='gif'/>
            </NavLink>)
      });
        return (
            <div>
                <h1>{this.username}</h1>
                <p>My Gifs</p>
                <div className="gifbox" ref="gifContainer">
                    {renderedGifs}
                </div>
            </div>
            // FIXME should display the basic user data. Maybe link to change pw, email and name forms?
        );
    }

    grabImages(data){
        var len = data.length;
        var images = [];
        for (var i = 0; i < len; i++){
          images.push(data[i]);
        }

        this.setState({gifs: images})

    }

    /* Placeholder. Since we won't have a logged in user until next phase.
       Based on code from class */

       // TODO replace this with a method that calls /api/gifs to get the user's saved gifs
    getSavedGifs() {
        fetch("/api/gifs/" + localStorage.getItem("uid"))
        .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("No Gifs");
                }
            })
            .then(json => {
                this.grabImages(json[0].gifs);

        })
        .catch(error => console.log(error))
    }

    getUsername() {
        fetch("/api/users/")
        .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("No username");
                }
            })
            .then(json => {
                for (var i = 0; i < json.length; i++) {
                    if (localStorage.getItem("uid") === json[i]._id) {
                        this.username = json[i].name;
                    }
                    
                }
        })
        .catch(error => console.log(error))
    }
}

export default Profile;
