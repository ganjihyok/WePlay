import React, { Component } from 'react';
import style from './Categories.css';

class Categories extends Component {
  constructor () {
    super();
    this.state ={
      curPage : 'home',
    }
    this.fetchMySongs = this.fetchMySongs.bind(this);
    this.fetchAll = this.fetchAll.bind(this);
    this.fetchParticipations = this.fetchParticipations.bind(this);
    this.highlightBtn = this.highlightBtn.bind(this);
  }

  fetchAll () {
    this.props.fetch()
    this.setState({
      curPage : 'home',
    })
  }

  fetchMySongs () {
    this.props.fetch(this.props.userInfo.username, null);
    this.setState({
      curPage : 'mySongs',
    })
  }

  fetchParticipations () {
    this.props.fetch(null, this.props.userInfo.participate);
    this.setState({
      curPage : 'participations',
    })
  }

  highlightBtn (btn) {
    if (btn === this.state.curPage) {
      return style[btn + 'BtnOn'];
    } else {
      return style[btn + 'BtnOff'];
    }
  }

  render () {
    return (
      <div className={style.categories}>
        <div className={style.btns}>
          <div className={style.btnContainer}>
            <button className={this.highlightBtn('home')} onClick={this.fetchAll}>
              <i className="fas fa-home"></i>
            </button>
          </div>
          <div className={style.btnContainer}>
            <button className={this.highlightBtn('mySongs')} onClick={this.fetchMySongs}>
              <i className="fas fa-list-alt"></i>
            </button>
          </div>
          <div className={style.btnContainer}>
            <button className={this.highlightBtn('participations')} onClick={this.fetchParticipations}>
              <i className="fas fa-users"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;