import React, { Component } from 'react';
import style from './LoginPage.css';
import SignupModule from '../SignupModule/SignupModule';
import LoginModule from '../LoginModule/LoginModule';
import Header from '../Header/Header';
import LoginPageHeader from '../LoginPageHeader/LoginPageHeader';

const axios = require('axios');

class LoginPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className={style.main}>
        <div className={style.imgContainer}>
          <img src="http://lorvensschool.com/img/music.jpg" className={style.coverImg} />
        </div>
        <div className={style.modulesContainer}>
          <LoginModule login={this.props.login} />
          <SignupModule login={this.props.login} />
        </div>
        <LoginPageHeader />
      </div>
    )
  }
}

export default LoginPage;