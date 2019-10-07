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
      notes: [],
      note: {} 
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

  getNote = (id) => {
    axios.get(urlFor(`notes/${id}`))
    .then((res) => this.setState({ note: res.data, showNote: true }) ) // want to pass note data and show it (showNote: true)
    .catch((err) => console.log(err.response.data) );
  }

  preformSubmissionRequest = (data, id) => { // this allows us to figure out if it needs to be a put or a patch - bc a patch will already have an id to use, but post won't have one
    if (id) {
      return axios.patch(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor('notes'), data);  
    }
  }
  
  submitNote = (data, id) => {
    this.preformSubmissionRequest(data, id)
    .then((res) => this.setState({ showNote: false}) )
    .catch((err) => console.log(err.response.data));
  }

  render() {
    const { showNote, notes, note } = this.state;  // here so you can use the variable as state and this keeps track of state and also needed to push state to child comp for their props - remember to list in their mounted comp in return

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
          { showNote ?  // the toggleNote={this.toggleNote} + showNote={showNote} are state that are being passed down
            <Note 
              note={note}
              submitNote={this.submitNote}
            /> 
            : 
            <List 
              getNotes={this.getNotes} // give list comp access to getnotes props 
              notes={notes}   // give list comp access to notes prop
              getNote={this.getNote}

              /> } 
      </div>
    )
  }
}

export default App;