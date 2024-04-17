import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const disabledButton = () => {
    if (!email || !password) {
      return true;
    }
    return false;
  }

  const demoUser = async (e) => {
    e.preventDefault();

    await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );
    closeModal();
  }

  return (
    <div className="login-modal">
      <h1 className="login-header">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-labels">
          Email
          <input
            type="text"
            className="login-inputs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            className="login-inputs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        {disabledButton() ?
          <button className='login-button' type="submit" disabled={true}>
            Log In
          </button>
          :
          <button className='login-success' type="submit" >Log In</button>
        }
      </form>
    </div>
  );
}

export default LoginFormModal;
