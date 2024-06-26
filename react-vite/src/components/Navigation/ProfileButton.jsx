import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate, NavLink } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden")
  const profURL = `/users/${user.id}`

  return (
    <div className="profile-button">
      <button id="prof-but" onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <div id="dropdown">
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <div id="profile-popup">
                <div className='menu-content'>
                  <div className="credentials">
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                  </div>
                  <NavLink id="to-profile" onClick={()=> setShowMenu(false)} to={profURL}>Manage Profile</NavLink>
                  <button id="logout" onClick={logout}>Log Out</button>
                </div>
              </div>
            ) : (
              <div id='popup'>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
