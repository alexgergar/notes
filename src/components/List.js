import React from 'react';
import NoteCard from './NoteCard.js';

class List extends React.Component {

  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    const { notes, getNote } = this.props; // extracts notes from list comp props given to it by parent

    const cards = notes.map((note, index) => {  // created the cards variable that iteraites thru notes array in app state
      return (
        <NoteCard  // this gives us a new NoteCard comp child passed individual note data as props
          key={index}
          index={index}
          note={note}
          getNote={getNote}
        />
      )
    });
    
    return (
      <div className="list-container">
        {cards}   {/* this has the notes data that goes through the NoteCard child comp */}
      </div>
    );
  }
}

export default List;