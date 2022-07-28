import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { Component, useState } from 'react';
class AppProgress extends Component { 
  constructor(props) {
    super(props);
    this.state = {}  
  }

  updateMessage(event) {
    this.props.updateMessage(event.target.value);
  }

 

  render() {
    return (
      <div>
        
       <ProgressBar now={this.props.loadVal} label={`${this.props.loadVal}%`} />
      </div>
    );
  }
}

export default AppProgress;