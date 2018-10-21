import React, { Component } from 'react';
import './Card.css';
//import img from'../images/1.jpeg'
// import 
class Card extends Component {
    constructor(props){
            super(props);
            // this.state ={
            //     flippedover:false
            // };
           this.handleClick = this.handleClick.bind(this);
        }
        
        handleClick(e){
            // this.setState({
            //     flippedover:true
            // });
           this.props.click(); 
        }


  render() {
       let image = this.props.flipped ? this.props.image : 'texture';
    return (
      <div className="memorycard"  onClick={this.handleClick}>
        <img src={require(`../images/${image}.jpg`)} 
        height="200" width="200"/>
      </div>
    );
  }
}

export default Card;
