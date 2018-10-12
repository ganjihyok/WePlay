import React, { Component } from 'react';
import style from './App.css';
import Header from '../Header/Header';
import LoginPage from '../LoginPage/LoginPage';
import Home from '../Home/Home';
import Categories from '../Categories/Categories';
import Cookies from 'universal-cookie';


const axios = require('axios');

class App extends Component {

  constructor() {
    super();

    const cookies = new Cookies();

    this.state = {
      userInfo : cookies.get('userInfo') || false,
      isLoggedin : false,
      songList : [],
    }
    this.fetchSongListData = this.fetchSongListData.bind(this);
    this.login = this.login.bind(this);
    this.fetchMore = this.fetchMore.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
    this.fetchSongListData();
  }

  login (data) {
    const cookies = new Cookies();

    cookies.set('userInfo', data, { path: '/' });
    this.setState({
      userInfo: data,
      isLoggedin: true
    });
  }

  logout () {
    const cookies = new Cookies();

    cookies.remove('userInfo');
    this.setState({
      userInfo: false,
    })
  }

  fetchSongListData (username, participations, query) {
    axios.get('/songList', {
      params: {
        username,
        participations,
        query
      }
    })
      .then((response) => {
        this.setState({
          songList: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchMore () {
    const {
      multiplier,
      songList
    } = this.state;
    this.setState({
      multiplier: multiplier + 1
    });
    axios.get('/fetchMore', {
      params: { multiplier }
    })
      .then((response) => {
        this.setState({
          songList: songList.concat(response.data)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    return (
      this.state.userInfo ? (
        <div className={style.main}>
          <Header userInfo={this.state.userInfo} fetch={this.fetchSongListData} logout={this.logout} />
          <Home userInfo={this.state.userInfo} songList={this.state.songList} fetch={this.fetchSongListData} />
        </div>
      ) : (
        <LoginPage login={this.login} />
      )
    )
  }
}

export default App;