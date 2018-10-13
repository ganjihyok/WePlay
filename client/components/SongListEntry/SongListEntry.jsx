import React, { Component } from 'react';
import style from './SongListEntry.css';

const axios = require('axios');

class SongListEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expand : false,
      hideExpandBtn : false,
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.parseURL = this.parseURL.bind(this);
    this.expandBtn = this.expandBtn.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.deselectRole = this.deselectRole.bind(this);
  }

  parseURL (url) {
    if (url.includes('.be/')) {
      return url.replace('.be/', 'be.com/embed/');
    }

    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
  }

  selectRole (e) {
    const {
      song,
      userInfo,
      fetch
    } = this.props;

    const updated = song;
    if (!userInfo) {
      alert('Please Login');
      return;
    }

    if (updated.ownerUsername === userInfo.username) {
      alert('You cannot participate your own song!');
      return;
    }

    updated.players.forEach((role) => {
      if (Object.keys(role)[0] === e.target.value) {
        role[e.target.value] = userInfo.username;
      }
    });

    axios.post('/updateSong', updated)
      .then((response) => {
        axios.post('/updateUser', {
          email: userInfo.email,
          username: userInfo.username,
          vid_id: song._id,
          pull: false
        })
          .then((res) => {
            fetch();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deselectRole (e) {
    const {
      song,
      userInfo,
      fetch
    } = this.props;

    const updated = song;
    if (!userInfo) {
      alert('Please Login');
      return;
    }

    if (updated.ownerUsername === userInfo.username) {
      alert('You cannot participate your own song');
      return;
    }

    updated.players.forEach((role) => {
      if (Object.keys(role)[0] === e.target.value) {
        role[e.target.value] = false;
      }
    });

    axios.post('/updateSong', updated)
      .then((response) => {
        axios.post('/updateUser', {
          email: userInfo.email,
          username: userInfo.username,
          vid_id: song._id,
          pull: true
        })
          .then((res) => {
            fetch();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  clickHandler () {
    const {
      click,
      song
    } = this.props;

    click(song);
  }

  expandBtn (e) {
    this.setState({
      expand : !this.state.expand,
      hideExpandBtn : !this.state.hideExpandBtn,
    })
  }

  render () {
    const {
      song,
      userInfo
    } = this.props;

    return (
      <div className={style.SongListEntry}>
        <div className={style.entryContainer}>
          <div className={style.usernameContainer}>
            {song.ownerUsername}
          </div>
          <div className={style.detailContainer}>
            {song.detail}
          </div>
          <div className={style.thumbnailContainer}>
            <iframe className={style.thumbnail} src={this.parseURL(song.url)} frameBorder="0" allowFullScreen />
          </div>
          <div className={this.state.expand ? style.playersExpanded : style.playersReduced}>
              {song.players.map((position) => {
                if (Object.values(position)[0].toString() === userInfo.username) {
                  return (
                    <button className={`${style.occupiedByMe} ${this.state.expand ? style.playerExpanded : style.playerReduced}`}
                            disabled={!this.state.expand}
                            value={Object.keys(position)}
                            onClick={this.deselectRole}>
                      {Object.keys(position)[0]}
                    </button>
                  );
                }
                if (Object.values(position)[0]) {
                  return (
                    <button className={`${style.occupied} ${this.state.expand ? style.playerExpanded : style.playerReduced}`}
                            disabled={!this.state.expand}
                            value={Object.keys(position)}>
                      {Object.keys(position)[0]}
                      <div className={this.state.expand ? style.usernameOccupied : style.usernameOccupiedHide}>
                        {Object.values(position)[0].toString()}
                      </div>
                    </button>
                  );
                }
                return (
                  <button className={`${style.unoccupied} ${this.state.expand ? style.playerExpanded : style.playerReduced}`}
                          disabled={!this.state.expand}
                          value={Object.keys(position)}
                          onClick={this.selectRole}>
                    {Object.keys(position)[0]}
                  </button>
                );
              })}
            <button className={this.state.hideExpandBtn ? style.expandBtnHide : style.expandBtn} onClick={this.expandBtn}>
              <i className="fas fa-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SongListEntry;