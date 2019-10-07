import React from 'react';

class Flash extends React.Component {
  
  componentDidMount() {
    setTimeout(() => {
      this.props.resetError();
    }, 2000);
  }
  
  render() {
    const { error } = this.props;

    return (
      <div className="flash-container">
        {error}
      </div>
    );
  }
}

export default Flash;