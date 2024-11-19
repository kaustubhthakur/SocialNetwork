import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/useShowToast";
import axios from "axios";  // Import axios
import "./RegisterPage.css"; // Import CSS file for styling

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async () => {
    try {
      // Use axios for the POST request
      const res = await axios.post("http://localhost:8000/auth/register", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-heading">Sign up</h1>
        <form
          className="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Sign up
          </button>
        </form>
        <p className="login-redirect">
          Already a user?{" "}
          <span
            className="login-link"
            onClick={() => setAuthScreen("login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
