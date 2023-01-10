
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoginFormModal from './auth/LoginModal';
import SignupFormModal from './auth/SignUpModal';

import ProfileButtonComponent from './ProfileButton';
import "./NavBar.css"

function NavBar() {

  const userIsLoggedIn = useSelector((state) => state.session.user)


  let sessionLinks;

  if (userIsLoggedIn) {
    sessionLinks = (
      <ProfileButtonComponent user={userIsLoggedIn}/>
    )
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        </>
    )
  }
  return (
    <div className="top">
        <div className="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className="home-icon">
            <img src="https://res.cloudinary.com/teepublic/image/private/s--rdSMZL_M--/c_fit,g_north_west,h_711,w_840/co_484849,e_outline:40/co_484849,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1592405498/production/designs/11418386_0.jpg" alt="nope"></img>
            <div className="home-text">
              Randdit
              </div>
            </div>
        </NavLink>
            </div>
            <div className="page-title">
                Where all weebs can live in harmony.
      </div>

      <div className="get-on-sib">
        {sessionLinks}
        </div>

    </div>
  );
}

export default NavBar;
