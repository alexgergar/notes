import React from 'react';

class Note extends React.Component {
  render() {
    const { note } = this.props;
    
    return (
      <div className="note-container">
        <form className="note-form">
          <input 
            className="note-title-input"
            type="text"
            placeholder="Note Title..."
            defaultValue={note.title} // defaultValue enables text input  to be initially rendered with data in textfield
          />
          <textarea 
            className="note-textarea" //text area html element allows multi line and enter is a new line not submit
            placeholder="Type Here..."
            defaultValue={note.content}
          />
          <input className="note-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Note;