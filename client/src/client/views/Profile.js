import React, { Component } from "react";
import { NavLink} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          gifs: []
        };
        this.grabImages = this.grabImages.bind(this);
        this.randomGifs = this.randomGifs.bind(this);
    }

    componentDidMount(){
      window.scrollTo(0, 0);
      this.randomGifs();
    }

    render () {
      var renderedGifs = this.state.gifs.map(function (gif, i){
          return (
            <NavLink to={'/share?gif='+ gif} key={i} className="gifLink">
              <img src={gif} key={i} alt="Gif failed to load" className='gif'/>
            </NavLink>)
      });
        return (
            <div>
                <h1>My Gifs</h1>
                <div className="gifbox" ref="gifContainer">
                    {renderedGifs}
                </div>
            </div>
        );
    }

    grabImages(data){
        var len = data.length;
        var images = [];
        for (var i = 0; i < len; i++){
          images.push(data[i].images.fixed_height.url);
        }

        this.setState({gifs: images})

    }

    /* Placeholder. Since we won't have a logged in user until next phase.
       Based on code from class */
    randomGifs() {
        fetch("http://api.giphy.com/v1/gifs/trending?api_key=vRvUFu9f8SrzzJWqp9b7aiIKTqKExxA2&limit=5")
        .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("No Gifs");
                }
            })
            .then(json => {
                // console.log("Response ",json)
                this.grabImages(json.data)

        })
        .catch(error => console.log(error))
    }
}

export default Profile;
