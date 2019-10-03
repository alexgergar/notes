import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import List from './components/List.js';
import Note from './components/Note.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote // flips the state boolean
    })
  }
  render() {
    const { showNote } = this.state;  

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
          { showNote ? <Note /> : <List /> } 
      </div>
    )
  }
}

export default App;