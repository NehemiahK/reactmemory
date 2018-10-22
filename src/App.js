import React, { Component } from 'react';
import Modal from 'react-modal';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game'
import Timer from './components/Timer';
import Winner from './components/Winner';

Modal.setAppElement('#root');

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      level:2,
      leveloptions : [{val:2,name:"easy"},{val:3,name:"medium"},{val:4,name:"hard"}],
      newGame:false,
      gametimer:0,
      gamewinner:false,
      mistakesMade:0
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setWinner = this.setWinner.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount(){
    if(this.state.gametimer == 0){
      this.startTimer();
    }
  }

  handleCloseModal(){
    this.setState({
      gamewinner:false
    })
  }

  startTimer(){
    setInterval(()=> 
      this.setState((state,props) => {return  {gametimer: state.gametimer + 1} } ),1000
  )
  }

  handleChange(e){
    // console.log(e.target.value);
    this.setState({
      level:e.target.value,
      gametimer:0
    });
  }

  handleClick(e){
    this.setState({
      newGame:true,
      gametimer:0
    })
  }

  setWinner(value){
    this.setState({
      gamewinner:true,
      mistakesMade:value,
      gametimer:0
    })
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.newGame !== prevState.newGame){
      this.setState(
        {newGame:false}
      )
    }

    if(this.state.timer !== prevState.timer && this.state.timer === 0){
      console.log("new game 0 seconds");
    }
}

  render() {
    return (
    <div>
     <div className="gameintro"> 
       <h1> React Memory Game</h1>
        <div className="optionwrapper">
          <select onChange={this.handleChange}>
            {this.state.leveloptions.map((choice) => <option key={choice.name} value={choice.val}>{choice.name}</option> ) }
          </select>
        </div>
          <div className="optionwrapper"><button onClick={this.handleClick}>New Game</button></div>
          
         <div className="optionwrapper" > <Timer seconds={this.state.gametimer}/> </div>
         
      </div>

     <Modal isOpen={this.state.gamewinner} contentLabel="min example" className="modal"
                onRequestClose={this.handleCloseModal}>
                <button onClick={this.handleCloseModal}>X</button>
     <Winner />
     You made {this.state.mistakesMade} mistakes and won in {this.state.gametimer} seconds!
        </Modal>
        <Game level={this.state.level} updateGame={this.state.newGame} onwin={this.setWinner}/>
        
         
    </div>
    );
  }
}

export default App;
