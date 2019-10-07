import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import List from './components/List.js';
import Note from './components/Note.js';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: [],
      note: {} ,
      newTag: false,
      error: ''
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: !this.state.showNote, // flips the state boolean
      note: {} // this will clear out any data that was stored so you will have a clean slate if clicked cancel then new note
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
    this.preformSubmissionRequest(data, id) // this figures out whether or not it's a post/patch
    .then((res) => this.setState({ showNote: false}) )
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.conent) {
        this.setState({ error: "missing Note Content! "});
      } else if (errors.title) {
        this.setState({ error: "Missing Note Title! "});
      }
    });
  }

  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter((note) => note.id !== id); // this will delete the note by id in the notes array - which is the state of the notes
    axios.delete(urlFor(`notes/${id}`)) // this will delete it from the db
    .then((res) => this.setState({ notes: newNotesState}) ) // This is the successfull situation with the state now being the new array of notes w/o the one we deleted
    .catch((err) => console.log(err.response.data));
  }

  showTagForm = () => {
    this.setState({ newTag: true});
  }

  closeTagForm = () => {
    this.setState({ newTag: false });
  }

  submitTag = (data, noteId) => {
    axios.post(urlFor(`notes/${noteId}/tags`), data)
    .then((res) => this.getNote(noteId))
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.name) {
        this.setState({ error: "Missing Tag Name!"})
      }
    });
  }

  deleteTag = (noteId, id) => {
    axios.delete(urlFor(`/tags/${id}`))
      .then((res) => this.getNote(noteId) )
      .catch((err) => console.log(err.response.data));
  }

  resetError = () => {

  }
  render() {
    const { showNote, notes, note, newTag, error } = this.state;  // here so you can use the variable as state and this keeps track of state and also needed to push state to child comp for their props - remember to list in their mounted comp in return

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        {error && <Flash error={error} resetError={this.resetError} />}
          { showNote ?  // the toggleNote={this.toggleNote} + showNote={showNote} are state that are being passed down
            <Note 
              note={note}
              submitNote={this.submitNote}
              showTagForm={this.showTagForm}
              newTag={newTag}
              closeTagForm={this.closeTagForm}
              submitTag={this.submitTag}
              deleteTag={this.deleteTag}
            /> 
            : 
            <List 
              getNotes={this.getNotes} // give list comp access to getnotes props 
              notes={notes}   // give list comp access to notes prop
              getNote={this.getNote}
              deleteNote={this.deleteNote}

              /> } 
      </div>
    )
  }
}

export default App;