import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import List from './components/List.js';
import Note from './components/Note.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <List />
        <Note />
      </div>
    )
  }
}

export default App;
