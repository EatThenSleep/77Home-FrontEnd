import React from 'react';
import '../../../styles/Header.scss'; // Import file CSS cho header

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <img src="/77Home.png" alt="Logo" className="logo" />
          <span className="logo-text">77Home</span>
          <nav>
            {/* <ul>
              <li className="dropdown">
                <a href="#">Places to stay</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Hotels</a></li>
                  <li><a href="#">Apartments</a></li>
                </ul>
              </li>
            </ul> */}
          </nav>
        </div>
        <div className="header-right">
          <div className="currency">USD</div>
          <div className="language">
            <i className="fas fa-globe"></i> {/* Icon quả địa cầu */}
          </div>
          <div className="notifications">
            <i className="fas fa-bell"></i> {/* Icon chuông */}
          </div>
          <div className="user-profile">
            <img src="/avatar.jpg" alt="Avatar" className="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
