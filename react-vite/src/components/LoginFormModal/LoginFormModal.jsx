import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true)
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
      navigate('/discover')
    }
  };

  useEffect(()=>{
    if (!email || !password) {
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
  }, [email, password])

  return (
    <div className="login-modal">
      <div className="overlay">
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
          {errors.email && <p className="error">{errors.email}</p>}
          <label className="login-labels">
            Password
            <input
              type="password"
              className="login-inputs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <button className='login-button' type="submit" disabled={btnDisabled}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
