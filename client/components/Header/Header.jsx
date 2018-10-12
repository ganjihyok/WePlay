import React, { Component } from 'react';
import style from './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Categories from '../Categories/Categories';

class Header extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <header className={style.header}>
      <div className={style.logo}>
        WePlay
      </div>
      <SearchBar fetch={this.props.fetch} />
      <Menu logout={this.props.logout} />
      <Categories userInfo={this.props.userInfo} fetch={this.props.fetch} />
      </header>
    );
  }
}

export default Header;