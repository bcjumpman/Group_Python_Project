import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isArtist, setIsArtist] = useState(false)
  const [artistName, setArtistName] = useState(null)
  const [artistCountry, setArtistCountry] = useState(null)
  const [artistBio, setArtistBio] = useState(null)
  const [errors, setErrors] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    if (password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must be the same as the Password field"

    if (Object.values(newErrors).length > 0) return setErrors(newErrors)

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
        is_artist: isArtist,
        artist_name: artistName,
        artist_country: artistCountry,
        artist_bio: artistBio
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/discover')
    }
  };
  // && (!artistName || !artistCountry || !artistBio)
  useEffect(()=>{
    if(!firstName || !lastName || !email || !username || !password || !confirmPassword || (isArtist === true && (!artistName || !artistCountry || !artistBio))) {
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
  }, [firstName, lastName, email, username, password, confirmPassword, isArtist, artistName, artistCountry, artistBio])

  return (
    <div className="signupModalWrapper">
      <div className="overlay">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>
          <div>First Name</div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p className="errorMessage">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p className="errorMessage">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p className="errorMessage">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword}</p>}
        <label id="isArtist">
          Are You An Artist?
          <input
            type="radio"
            value="true"
            checked={isArtist === true}
            onChange={() => setIsArtist(true)}
          /> Yes
          <input
            type="radio"
            value="false"
            checked={isArtist === false}
            onChange={() => setIsArtist(false)}
          /> No
        </label>
        {errors.isArtist && <p className="errorMessage">{errors.isArtist}</p>}
        {isArtist && (
          <>
            <label>
              Artist Name
              <input
                type="text"

                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </label>
            {errors.artistName && <p className="errorMessage">{errors.artistName}</p>}
            <label>
              Country
              <input
                type="text"
                value={artistCountry}
                onChange={(e) => setArtistCountry(e.target.value)}
              />
            </label>
            {errors.artistCountry && <p className="errorMessage">{errors.artistCountry}</p>}
            <label>
              Biography
              <textarea
                value={artistBio}
                onChange={(e) => setArtistBio(e.target.value)}
              />
            </label>
            {errors.artistBio && <p className="errorMessage">{errors.artistBio}</p>}
          </>
        )}
        <button className="signupModalButton" disabled={btnDisabled} type="submit">Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
