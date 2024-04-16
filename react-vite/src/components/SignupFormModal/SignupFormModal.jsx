import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isArtist, setIsArtist] = useState("")
  const [artistName, setArtistName] = useState("")
  const [artistCountry, setArtistCountry] = useState("")
  const [artistBio, setArtistBio] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        firstName,
        lastName,
        email,
        username,
        password,
        isArtist,
        artistName,
        artistCountry,
        artistBio
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const invalidInfo = () => {
    return (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !isArtist ||
      !artistName ||
      !artistCountry
    );
  };

  const disabledButton = () => {
    return (firstName === "" || lastName === "" || email === "" || username === "" || confirmPassword === "" || isArtist === "" || artistName === "" || artistCountry === "")
  }

  return (
    <div className="signupModalWrapper">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errorMessage">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="errorMessage">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errorMessage">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword}</p>}
        <label>
          Are You An Artist?
          <input
            type="radio"
            value="true"
            checked={isArtist === true}
            onChange={() => setIsArtist(true)}
            required
          /> Yes
          <input
            type="radio"
            value="false"
            checked={isArtist === false}
            onChange={() => setIsArtist(false)}
            required
          /> No
        </label>
        {errors.isArtist && <p className="errorMessage">{errors.isArtist}</p>}
        <label>
          Artist Name
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            required
          />
        </label>
        {errors.artistName && <p className="errorMessage">{errors.artistName}</p>}
        <label>
          Country
          <input
            type="text"
            value={artistCountry}
            onChange={(e) => setArtistCountry(e.target.value)}
            required
          />
        </label>
        {errors.artistCountry && <p className="errorMessage">{errors.artistCountry}</p>}
        <label>
          Biography
          <input
            type="textarea"
            value={artistBio}
            onChange={(e) => setArtistBio(e.target.value)}
            required
          />
        </label>
        {errors.artistBio && <p className="errorMessage">{errors.artistBio}</p>}
        {disabledButton() ?
          <button className="disabledSignupButton" disabled={true} type="submit">Sign Up</button>
          : <button className="signupModalButton" disabled={invalidInfo()} type="submit">Sign Up</button>}
      </form>
    </div>
  );
}

export default SignupFormModal;
