import React, { Component } from 'react';
import './Card.css';


class Card extends Component {
    constructor(props){
            super(props);
            this.state = {
              flipping:false,
            }
           this.handleClick = this.handleClick.bind(this);
        }
        
        handleClick(e){
          if(!this.props.flipped && this.props.canbeclicked){
            this.props.click(); 
            this.setState({
             flipping:true,
            
           })
          }
          
        }

        componentDidUpdate(prevProps,prevState){
          if(this.state.flipping !== prevState.flipping){
            setTimeout( ()=>  this.setState({ flipping:false}),1000);
          }
      }

    


  render() {
       let image = this.props.flipped ? this.props.image : 'texture';
    return (
      <div className={this.state.flipping ? "memorycard flipped":"memorycard" }  onClick={this.handleClick}>
        <img src={require(`../images/${image}.jpg`)} 
        height="200" width="200"/>
      </div>
    );
  }
}

export default Card;
