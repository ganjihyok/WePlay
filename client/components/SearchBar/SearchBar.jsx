import React, { Component } from 'react';
import style from './SearchBar.css';

const axios = require('axios');

class SearchBar extends Component {
  constructor () {
    super();

    this.state = {
      search : '',
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
  }

  handleSearch (e) {
    this.setState({ search: e.target.value });
  }

  search () {
    this.props.fetch(null, null, this.state.search);
  }

  render () {
    return (
      <div className={style.searchBar}>
        <input className={style.input} type="text" placeholder="Search songs by name" name="search" value={this.state.search} onChange={this.handleSearch} required />
        <button className={style.searchBtn} onClick={this.search}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    );
  }
}

export default SearchBar;