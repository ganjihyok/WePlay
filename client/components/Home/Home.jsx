import React, { Component } from 'react';
import style from './Home.css';
import UserInfo from '../UserInfo/UserInfo';
import SongListEntry from '../SongListEntry/SongListEntry';
import PostingModal from '../PostingModal/PostingModal';

class Home extends Component {
  constructor () {
    super();
    this.state = {
      postingModal : false,
    }
    this.posting = this.posting.bind(this);
  }

  posting () {
    this.setState({
      postingModal : !this.state.postingModal
    })
  }

  render () {
    return (
      <div className={style.Home} >
        <UserInfo userInfo={this.props.userInfo} />
        <div className={style.songList}>
          {this.state.postingModal && <PostingModal closeModal={this.posting} userInfo={this.props.userInfo} fetch={this.props.fetch} />}
          <div className={style.posting} onClick={this.posting}>
            <div>
              <i className={`material-icons ${style.icon}`}>
                add
              </i>
              <div className={style.btnDescription}>
                Post a new song
              </div>
            </div>
          </div>
          {this.props.songList.map(song => <SongListEntry key={song._id} song={song} userInfo={this.props.userInfo} fetch={this.props.fetch} />)}
        </div>
      </div>
    );
  }
}

export default Home;