import React from 'react';

class NoteCard extends React.Component {
  render() {
    const { note } = this.props;

    return (
      <div className="note-card-container">
        <div className="note-card-title"> 
          {note.title} 
        </div>
        <div className="note-card-content">
          {note.content}
        </div>
        <span className="note-card-delete">
          <i class="material-icons">close</i>
        </span>
        <span className="note-card-edit">
          <i class="material-icons">create</i>
        </span>
      </div>
    );
  }
}

export default NoteCard;