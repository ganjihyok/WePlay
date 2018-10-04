import React, { Component } from 'react';

const style = require('./App.css');

class App extends Component {
  constructor() {
    super();

  }
  render () {
    return (
      <div className={style.main}>
        Hello World!!!!
      </div>
    )
  }
}

export default App;