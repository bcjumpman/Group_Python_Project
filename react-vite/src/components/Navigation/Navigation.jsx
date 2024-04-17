import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from '/musichaze_logo_yellowBG.png'
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  const sessionLinks = sessionUser ?
    (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    ) : (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>

      </>
    );


  return (
    <>
      <ul id="navbar-full">
        <div className="navbar-left">
          <NavLink></NavLink>
          <NavLink to="/discover" className="site-title">
            <img id="nav-logo" src={logo} alt="" />
          </NavLink>
        </div>

        <div className="navbar-right">
          <ProfileButton />
        </div>
        {isLoaded && sessionLinks}
      </ul>
      <Outlet />
      {/* This lies the location for the media player */}
    </>
  );
}

export default Navigation;
