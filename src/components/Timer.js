import React, { Component } from 'react';
// import logo from './logo.svg';


class Timer extends Component {

  render() {
    return (
    <div>
     Timer: {this.props.seconds}
    </div>
    );
  }
}

export default Timer;
