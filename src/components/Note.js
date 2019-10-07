import React from 'react';

class Note extends React.Component {
  
  onSubmit(e) {
    e.preventDefault();
    const formData = {
      title: this.title.value,
      content: this.content.value
    };
    this.props.submitNote(formData, this.props.note.id);
  }
  
  render() {
    const { note } = this.props;
    
    return (
      <div className="note-container">
        <form className="note-form" onSubmit={(e) => this.onSubmit(e)}>
          <input 
            className="note-title-input"
            type="text"
            placeholder="Note Title..."
            defaultValue={note.title} // defaultValue enables text input  to be initially rendered with data in textfield
            ref={(input) => this.title = input}

          />
          <textarea 
            className="note-textarea" //text area html element allows multi line and enter is a new line not submit
            placeholder="Type Here..."
            defaultValue={note.content}
            ref={(input) => this.content = input} // allows use to easily access the content field
          />
          <input className="note-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Note;