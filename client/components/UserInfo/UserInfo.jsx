import React, { Component } from 'react';
import style from './UserInfo.css';

class UserInfo extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className={style.userInfo} >
        <div className={style.userInfoContainer} >
          <i className="far fa-user-circle fa-10x"></i>
        </div>
        <div className={style.username}>
          {this.props.userInfo.username}
        </div>
        <div className={style.userEmail}>
          {this.props.userInfo.email}
        </div>
      </div>
    );
  }
}

export default UserInfo;