import React, { Component } from 'react';
import style from './PostingModal.css';

const axios = require('axios');

class PostingModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPage: 1,
      title: '',
      detail: '',
      url: '',
      role: '',
      roles: ['V1', 'V2', 'CO', 'K1', 'K2', 'G1', 'G2', 'BA', 'DR'],
      selectedRoles: []
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.showSelectRolePage = this.showSelectRolePage.bind(this);
    this.showSelectRolesPage = this.showSelectRolesPage.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.selectRoles = this.selectRoles.bind(this);
    this.unselectRoles = this.unselectRoles.bind(this);
    this.submit = this.submit.bind(this);
    this.showFirstPage = this.showFirstPage.bind(this);
  }

  handleTitle (e) {
    this.setState({ title: e.target.value });
  }

  handleDetail (e) {
    this.setState({ detail: e.target.value });
  }

  handleUrl (e) {
    this.setState({ url: e.target.value });
  }

  showFirstPage () {
    this.setState({ currentPage: 1 });
  }

  showSelectRolePage () {
    if (!this.state.title || !this.state.detail || !this.state.url) {
      alert('Please fill out');
    } else {
      this.setState({ currentPage: 2 });
    }
  }

  showSelectRolesPage () {
    if (!this.state.role) {
      alert('Please pick your role');
    } else {
      this.setState({ currentPage: 3 });
    }
  }

  selectRole (e) {
    this.setState({ role: e.target.value });
  }

  selectRoles (e) {
    const { selectedRoles } = this.state;
    const newArray = selectedRoles;
    newArray.push(e.target.value);
    this.setState({ selectedRoles: newArray });
  }

  unselectRoles (e) {
    const { selectedRoles } = this.state;
    const newArray = selectedRoles;
    const index = newArray.indexOf(e.target.value);
    newArray.splice(index, 1);
    this.setState({ selectedRoles: newArray });
  }

  submit () {
    const {
      role,
      title,
      detail,
      url,
      selectedRoles
    } = this.state;

    const {
      userInfo,
      closeModal,
      fetch
    } = this.props;

    const players = [];
    const roles = (val, val2) => {
      const result = {};
      result[val] = val2;
      return result;
    };

    players.push(roles(role, userInfo.username));

    selectedRoles.forEach((role) => {
      players.push(roles(role, false));
    });

    axios.post('/song', {
      ownerEmail: userInfo.email,
      ownerUsername: userInfo.username,
      name: title,
      detail: detail,
      url: url,
      players: players
    })
      .then((response) => {
        alert('your song has been posted!');
        closeModal();
        fetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderPages (pageNum) {
    const {
      title,
      url,
      detail,
      roles,
      role,
      selectedRoles
    } = this.state;

    let currentHeight = window.innerHeight;

    if (pageNum === 1) {
      return (
        <div>
          <div className={style.closeBtn} onClick={this.props.closeModal}>
            <i className="far fa-times-circle fa-2x"></i>
          </div>
          <div>
            POST
          </div>
          <div className={style.postContainer}>
            <div className={style.titleContainer}>
              <input className={style.titleInput} placeholder="Title" type="text" name="pname" value={title} onChange={this.handleTitle} required />
            </div>
            <div className={style.urlContainer}>
              <input className={style.urlInput} placeholder="Youtube URL" type="text" name="url" value={url} onChange={this.handleUrl} required />
            </div>
            <div className={style.detailContainer}>
              <textarea className={style.detailInput} style={{height: currentHeight / 5}} placeholder="Detail" type="text" name="detail" value={detail} onChange={this.handleDetail} required />
            </div>
            <div className={style.nxtBtn} onClick={this.showSelectRolePage}>
              NEXT
            </div>
          </div>
        </div>
      );
    }
    if (pageNum === 2) {
      return (
        <div>
          <div className={style.closeBtn} onClick={this.props.closeModal}>
            <i className="far fa-times-circle fa-2x"></i>
          </div>
          <div className={style.postContainer}>
            <h2>
              You are..
            </h2>
            <div>
              {roles.map((item) => {
                if (role === item) {
                  return (
                    <button className={style.selectedRole} value={item}>
                      {item}
                    </button>
                  );
                }
                return (
                  <button className={style.role} value={item} onClick={this.selectRole}>
                    {item}
                  </button>
                );
              })}
            </div>
            <div className={style.prevBtn} onClick={this.showFirstPage}>
              PREV
            </div>
            <div className={style.nxtBtn} onClick={this.showSelectRolesPage}>
              NEXT
            </div>
          </div>
        </div>
      );
    }
    if (pageNum === 3) {
      return (
        <div>
          <div className={style.closeBtn} onClick={this.props.closeModal}>
            <i className="far fa-times-circle fa-2x"></i>
          </div>
          <div className={style.postContainer}>
            <h2>
              And you need..
            </h2>
            <div>
              {roles.map((item) => {
                if (role === item) {
                  return (
                    <button className={style.selectedRole} value={item}>
                      {item}
                    </button>
                  );
                }
                if (selectedRoles.includes(item)) {
                  return (
                    <button className={style.selectedRoles} value={item} onClick={this.unselectRoles}>
                      {item}
                    </button>
                  );
                }
                return (
                  <button className={style.role} value={item} onClick={this.selectRoles}>
                    {item}
                  </button>
                );
              })}
            </div>
            <div className={style.prevBtn} onClick={this.showSelectRolePage}>
              PREV
            </div>
            <div className={style.submitBtn} onClick={this.submit}>
              Submit
            </div>
          </div>
        </div>
      );
    }
  }

  render () {
    const { currentPage } = this.state;
    
    return (
      <div className={style.outerModal}>
        <div className={style.innerModal}>
          {this.renderPages(currentPage)}
        </div>
      </div>
    );
  }
}

export default PostingModal;