import React, { Component } from 'react';
import Card from './Card';
import './Game.css'


class Game extends Component {
    constructor(props){
        super(props);
        this.state ={
            cards:[],
            flipped:[],
            cardvals:[],
            readytocheck:true,
            level:2,
            mistakes:0,
           
        };
        this.handleClick = this.handleClick.bind(this);
        this.compareValues = this.compareValues.bind(this);
        this.renderGame = this.renderGame.bind(this);
    }

    componentDidMount(){
        this.setState({
            level:this.props.level
        });
        this.renderGame();
       // console.log(this.state.level)
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    compareValues(){
           setTimeout( () => this.delayedFlip(), 1600);
    }

    delayedFlip(){
          
        let [a,b] = this.state.cardvals;
       
        if (a !== b ){
            let newflipped = [...this.state.flipped];
            newflipped.splice(-2,2)

           this.setState((state,props) => {
               return{
               flipped: newflipped,
               mistakes: state.mistakes + 1
            }
               
           });
        }

        if(this.state.flipped.length === this.state.cards.length){
           this.props.onwin(this.state.mistakes);
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

        if(this.props.level !== prevProps.level){
            console.log("props level change");
            this.setState({
                level:this.props.level
            });
        }

        if(this.state.level !== prevState.level){
             console.log("state level change");
                this.renderGame();
        }

        if(this.state.cards !== prevState.cards){
            console.log("cards changed");
        }

        if(this.props.updateGame !== prevProps.updateGame){
            if(this.props.updateGame){
                this.renderGame(); 
            }
        }

    }

    renderGame(){
        console.log("render called");
        let images = [];
        let level = this.state.level *3 ;
    
        for (let i =1; i<level +1; i++){
          images.push(i);
          images.push(i);
        }
        let shuffledImages = this.shuffle(images);
    
        this.setState({
            cards: shuffledImages,
            flipped:[],
            cardvals:[],
            readytocheck:true,
            mistakes:0
        });
    }
   
  

  render() {
    //let cards = this.state.cards;
    return (
      <div className="gameboard">
     
      {this.state.cards.map( 
          (num,index) => <Card canbeclicked={this.state.cardvals.length < 2} image={num} flipped={this.state.flipped.includes(index)} 
          key={index} click={() => this.handleClick(num,index)}/> )}
     
      </div>
    );
  }
}

export default Game;
