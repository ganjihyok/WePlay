import React, { Component } from 'react';
import style from './Menu.css';

class Menu extends Component {
  constructor () {
    super();

    this.state = {
      showMenu : false,
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu (e) {
    e.preventDefault();

    this.setState({ showMenu: !this.state.showMenu }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render () {
    return (
      <div className={style.menuBtn}>
        <div className={style.icon} onClick={this.showMenu}>
          <i className="fas fa-bars"></i>
        </div>
        {
          this.state.showMenu
            ? (
              <div className={style.menu}>
                <button className={style.menuItem}>
                    My page
                </button>
                <div className={style.divider} />
                <button className={style.menuItem} onClick={this.props.logout} >
                    Log out
                </button>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default Menu;