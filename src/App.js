import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import List from './components/List.js';
import Note from './components/Note.js';
import axios from 'axios';
import urlFor from './helpers/urlFor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: [] 
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote // flips the state boolean
    })
  }

  getNotes = () => {
    axios.get(urlFor('notes')) // this is a function in urlFor where we pass the endpoint of notes
    .then((res) => this.setState({ notes: res.data}) ) // this calls setState and updates notes property in the app's comp state
    .catch((err) => console.log(err.response.data) );
  }

  render() {
    const { showNote, notes } = this.state;  // this keeps track of state and also needed to push state to child comp for their props - remember to list in their mounted comp in return

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
          { showNote ?  // the toggleNote={this.toggleNote} + showNote={showNote} are state that are being passed down
            <Note /> 
            : 
            <List 
              getNotes={this.getNotes} // give list comp access to getnotes props 
              notes={notes}   // give list comp access to notes prop
              /> } 
      </div>
    )
  }
}

export default App;