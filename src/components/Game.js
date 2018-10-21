import React, { Component } from 'react';
import Card from './Card';
import './Game.css'

class Game extends Component {
    constructor(props){
        super(props);
        this.state ={
            cards:[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12],
            flipped:[],
            cardvals:[],
            readytocheck:true
        };
        this.handleClick = this.handleClick.bind(this);
        this.compareValues = this.compareValues.bind(this);
    }

    compareValues(){
           setTimeout( () => this.delayedFlip(), 2000);
    }

    delayedFlip(){
          
        let [a,b] = this.state.cardvals;
       
        if (a !== b ){
            let newflipped = [...this.state.flipped];
            newflipped.splice(-2,2)

           this.setState({
               flipped: newflipped
           });
        }
        
        this.setState({
            cardvals:[],
            readytocheck: true
        }) 
    }


    handleClick(values,index){       
        if (this.state.readytocheck){
            this.setState((state,props) => {
                return {
                    flipped:[...this.state.flipped,index],
                    cardvals:[...this.state.cardvals,values],
                    }; 
            });

        }
      
        
        
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.cardvals.length !== prevState.cardvals.length){
            if (this.state.cardvals.length == 2){
                this.compareValues();
                this.setState({
                    readytocheck: false
                });
            }  
        }
    }
    
  render() {
      let images = [];
      for (let i =1; i<13; i++){
        images.push(i);
      }

    return (
      <div className="gameboard">
     <div> React Memory Game</div>
      {this.state.cards.map( (num,index) => <Card image={num} flipped={this.state.flipped.includes(index)} key={index} click={() => this.handleClick(num,index)}/> )}
     
      </div>
    );
  }
}

export default Game;
