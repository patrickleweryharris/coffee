import React, { Component } from "react";
import twitter from '../images/sharing/twitter.svg';
import facebook from '../images/sharing/facebook.svg';
import giphy from '../images/sharing/giphy.png';
import '../style/Share.css'

class Share extends Component {
  constructor(props) {
    super(props);

    this.state={
      gif: ""
    }
    this.createQuery = this.createQuery.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0, 0);
    this.createQuery();
  }
  render(){
    return (
      <div className="shareBox">
        <img src={this.state.gif} alt="Gif could not be shown" className="gif"/>
        <br/>
        <a href={"https://twitter.com/intent/tweet/?text=Check%20out%20this%20cool%20gif!%20&amp;url="+this.state.gif} target="_blank">
          <img src={twitter} alt="Share button not found" className="shareButton"/>
        </a>
        <a href={"https://facebook.com/sharer/sharer.php?u="+this.state.gif} target="_blank">
          <img src={facebook} alt="Share button not found" className="shareButton"/>
        </a>
        <a href={this.state.gif} target="_blank">
          <img src={giphy} alt="Share button not found" className="shareButton"/>
        </a>
      </div>
    );
  }

  createQuery(){
    var image = "";
    image = this.props.location.search.substring(5); // Removes the ?gif=
    this.setState({gif: image});
  }
}
export default Share;
