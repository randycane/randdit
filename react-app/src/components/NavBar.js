
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import CreateSubRandditComponent from './Subranddits/CreateSub';
import LoginFormModal from './auth/LoginModal';
import SignupFormModal from './auth/SignUpModal';

import ProfileButtonComponent from './ProfileButton';
import "./NavBar.css"

function NavBar() {

  const dispatch = useDispatch()
  const history = useHistory()

  const [isSubmitted, setIsSubmitted] = useState("");

  const [showMenu, setShowMenu] = useState(false)

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
    <nav className="top">
        <div className="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className="home-icon">
            <img src="https://i.pinimg.com/736x/bb/b2/cf/bbb2cff9da7cf8f0048d1d884b03ad10.jpg" alt="nope"></img>
            <div className="home-text">
              Home
              </div>
            </div>
        </NavLink>
            </div>
            <div className="page-title">
                Welcome to the forum where all weebs can live in harmony.
      </div>

      <div className="get-on-sib">
        {sessionLinks}
        </div>

    </nav>
  );
}

export default NavBar;
