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
  render() {
    const { showNote } = this.state;  

    return (
      <div className="App">
        <Nav />
          { showNote ? <Note /> : <List /> } 
      </div>
    )
  }
}

export default App;