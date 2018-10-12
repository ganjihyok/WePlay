import React, { Component } from 'react';
import style from './LoginPageHeader.css';

class LoginPageHeader extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <header className={style.Header}>
        WePlay
      </header>
    );
  }
}

export default LoginPageHeader;