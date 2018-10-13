import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SignupModule.css';

const axios = require('axios');

class SignupModule extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      emailValidation: -1,
      passwordValidation: -1,
      usernameValidation: -1

    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.singupHandler = this.singupHandler.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  handleEmail (e) {
    this.setState({ email: e.target.value });
  }

  handlePassword (e) {
    this.setState({ password: e.target.value });
  }

  handleUsername (e) {
    this.setState({ username: e.target.value });
  }

  validateEmail (e) {
    if (e.target.value.length === 0) {
      this.setState({ emailValidation: -1 });
      return;
    }

    if (!e.target.value.includes('.com') || !e.target.value.includes('@')) {
      this.setState({ emailValidation: 2 });
      return;
    }

    axios.get('/emailValidation', {
      params: {
        email: e.target.value
      }
    })
      .then((response) => {
        if (response.data.length !== 0) {
          this.setState({ emailValidation: 0 });
        } else {
          this.setState({ emailValidation: 1 });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  validatePassword (e) {
    if (e.target.value.length >= 8) {
      this.setState({ passwordValidation: 1 });
    } else {
      this.setState({ passwordValidation: 0 });
    }
  }

  validateUsername (e) {
    if (e.target.value.length === 0) {
      this.setState({ usernameValidation: -1 });
      return;
    }
    if (e.target.value.length < 5) {
      this.setState({ usernameValidation: 2 });
      return;
    }

    axios.get('/usernameValidation', {
      params: {
        username: e.target.value
      }
    })
      .then((response) => {
        if (response.data.length !== 0) {
          this.setState({ usernameValidation: 0 });
        } else {
          this.setState({ usernameValidation: 1 });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  enableSubmitBtn () {
    const {
      emailValidation,
      passwordValidation,
      usernameValidation
    } = this.state;
    if (
      emailValidation === 1 &&
      passwordValidation === 1 &&
      usernameValidation === 1
    ) {
      return (
        <button className={style.submitBtnEanbled} type="submit">
          Sign up
        </button>
      );
    }
    return (
      <button className={style.submitBtnDisabled} disabled={true}>
        Sign up
      </button>
    );
  }

  singupHandler (e) {
    const {
      email,
      password,
      username
    } = this.state;

    e.preventDefault();

    axios.post('/signup', {
      email: email,
      password: password,
      username: username,
      posting_list: [],
      participate: [],
      picUrl: '',
      webandList: [],
      ownedWeband: []
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Username or Password in use');
        } else {
          alert('Welcome to WePlay!');
          axios.get('/login', {
            params: {
              email: email,
              password: password
            }
          })
            .then((res) => {
              if (res.data.length === 0) {
                alert('Email or password is incorrect')
              } else {
                login(res.data[0]);
                toggleLoginModal();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    const {
      email,
      password,
      username,
      emailValidation,
      passwordValidation,
      usernameValidation
    } = this.state;

    return (
      <div className={style.mainContainer}>
        <div className={style.signupDescription}>
          Be Ready to Rock n' Roll
        </div>
        <div className={style.divideLine} />
        <form className={style.singupContainer} onSubmit={this.singupHandler}>
          <div className={style.content}>
            {(() => {
              switch (emailValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateEmail} placeholder="Enter email" value={email} onChange={this.handleEmail} required />
                    <div className={style.validationFail}>
                      Email address in use.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validateEmail} placeholder="Enter email" value={email} onChange={this.handleEmail} required />
                );
                case 2: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateEmail} placeholder="Enter email" value={email} onChange={this.handleEmail} required />
                    <div className={style.validationFail}>
                      Invalid email format.
                    </div>
                  </div>
                );
                default: return (
                  <input className={style.input} onBlur={this.validateEmail} placeholder="Enter email" value={email} onChange={this.handleEmail} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {(() => {
              switch (passwordValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validatePassword} type="password" placeholder="Enter password" value={password} onChange={this.handlePassword} required />
                    <div className={style.validationFail}>
                      Password must be longer than 8 characters.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validatePassword} type="password" placeholder="Enter password" value={password} onChange={this.handlePassword} required />
                );
                default: return (
                  <input className={style.input} onBlur={this.validatePassword} type="password" placeholder="Enter password" value={password} onChange={this.handlePassword} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {(() => {
              switch (usernameValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateUsername} placeholder="Enter username" value={username} onChange={this.handleUsername} required />
                    <div className={style.validationFail}>
                      Username in use.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validateUsername} placeholder="Enter username" value={username} onChange={this.handleUsername} required />
                );
                case 2: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateUsername} placeholder="Enter username" value={username} onChange={this.handleUsername} required />
                    <div className={style.validationFail}>
                      Username must be longer than 4 characters
                    </div>
                  </div>
                );
                default: return (
                  <input className={style.input} onBlur={this.validateUsername} placeholder="Enter username" value={username} onChange={this.handleUsername} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {this.enableSubmitBtn()}
          </div>
          <div className={style.divideLine} />
        </form>
      </div>
    );
  }
}

export default SignupModule;
