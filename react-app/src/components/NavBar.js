
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

const NavBar = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [isSubmitted, setIsSubmitted] = useState("");

  const userIsLoggedIn = useSelector((state) => state.session.user)

  let handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }
  return (
    <nav className="top">
        <div className="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className="home-icon">
              <img src="https://i.pinimg.com/736x/bb/b2/cf/bbb2cff9da7cf8f0048d1d884b03ad10.jpg" alt="nope"></img>
            </div>
          </NavLink>
            </div>
            <div className="page-title">
                Randdit, a Home for all Weebs to unite.
              </div>

      {/* <div className="nav-right">

        {userIsLoggedIn && (
          <>
          {/* <div className="profile-infor">

            </div> */}


                  {/* <LogoutButton />
            </div>

              )} */}


          {/* {!userIsLoggedIn && (
            <div className="register-buttons">
              <div className="nav-item" id="sign-up-button">
                <LoginFormModal />
              </div>
              <div className="nav-item" id="sign-up-button">
                <SignupFormModal />
              </div>
            </div>
          )}
        </div> */}
    </nav>
  );
}

export default NavBar;
