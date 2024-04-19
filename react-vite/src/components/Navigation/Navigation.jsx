import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from "/musichaze_logo_yellowBG.png";
import "./Navigation.css";
import SongPlayer from "../SongPlayer";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
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
        <div>
          <div className="navbar-left">
            <Link to="/discover">
              <img id="nav-logo" src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-right">
            <ProfileButton />
          </div>
        </div>
        {isLoaded && sessionLinks}
      </ul>
      <Outlet />
      <SongPlayer />
    </>
  );
}

export default Navigation;
