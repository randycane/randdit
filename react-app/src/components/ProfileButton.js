// import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { NavLink, useHistory } from "react-router-dom";
// // import * as sessionActions from '../../store/session';
// import LogoutButton from "./auth/LogoutButton";

// function ProfileButtonComponent({ users }) {

//     const history = useHistory()
//     const dispatch = useDispatch()

//     const [showMenu, setShowMenu] = useState(false)

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true)
//     }

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = () => {
//             setShowMenu(false)
//         }
//         document.addEventListener('click', closeMenu)

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu])

//     return (
//         <div className="NavBarRight-MenuHost">
//           { users && <NavLink className='HostButton' to='/spots/new'>Become a Host</NavLink> }
//             <button className="DropDownMenuIcon" onClick={openMenu}>
//               <i className="fas fa-bars"/> <i className="fas fa-user-circle"/>
//               </button>

//           {showMenu && (
//             <div className="profile-dropdown">
//               <div className="top">Welcome, {users.username}!</div>
//               <div className="top">Profile: {users.email}</div>
//             <div className="NaviBarShowing">
//               { users && (
//                 <div className="UserBarNavi" >
//                 <NavLink  className="Logout" to='/' onClick={LogoutButton}>Log out</NavLink>
//                 </div>
//               )}
//             </div>
//             </div>
//           )}
//         </div>
//       );
// }


// export default ProfileButtonComponent;
