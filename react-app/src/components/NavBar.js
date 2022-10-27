
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import CreateSubRandditComponent from './Subranddits/CreateSub';
import LoginFormModal from './auth/LoginModal';
import SignupFormModal from './auth/SignUpModal';

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
      <div className="nav-top">
        <div className="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="nav-side">
          <div className="create-business-modal">

            <div className="logged-in-buttons">
              {userIsLoggedIn && (
                <button className="community-button">
                  <CreateSubRandditComponent/>
                </button>
              )}
              {userIsLoggedIn && (
                <button className="out-button">
                  <LogoutButton />
                </button>
              )}
              </div>
            </div>
          </div>
          </form>

          {!userIsLoggedIn && (
            <div className="register-buttons">
              <div className="nav-item" id="sign-up-button">
                <LoginFormModal />
              </div>
              <div className="nav-item" id="sign-up-button">
                <SignupFormModal />
              </div>
            </div>
          )}
        </div>
    </nav>
  );
}

export default NavBar;
