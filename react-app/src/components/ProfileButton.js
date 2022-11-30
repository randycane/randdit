import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
// import * as sessionActions from '../../store/session';
import LogoutButton from "./auth/LogoutButton";

import "./NavBar.css"

function ProfileButtonComponent({user}) {

    const [showMenu, setShowMenu] = useState(false)

    const userIsLoggedIn = useSelector((state) => state.session.user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false)
        }
        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])

    return (
        <div className="nav-bar-right">
            {userIsLoggedIn && (
                <button className="DropDownMenuIcon" onClick={openMenu}>
                    <i className="fas fa-bars" /> <i className="fas fa-user-circle" />
                </button>
            )}

          {showMenu && (
            <div className="profile-dropdown">
              <div className="comm">Welcome, {user.username}!</div>
                    <div className="comm">Profile: {user.email}</div>
                    {userIsLoggedIn && (
                        <div className="get-out" >
                            <LogoutButton />
                        </div>
                    )}
            </div>
          )}
        </div>
      );
}


export default ProfileButtonComponent;
