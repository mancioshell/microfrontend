import React, { useState, useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ajaxService, setAjaxService] = useState(undefined);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    ajaxService
      .doAjax("POST", "/api/login", {}, { email: username, password: password })
      .then((result) => {
        let accessToken = result.data.accessToken;
        sessionStorage.setItem("accessToken", accessToken);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    async function getAjaxService() {
      const module = await import("utils/AjaxService");
      setAjaxService(module);
    }

    getAjaxService();
  }, []);

  return (
    <div className="row mt-5 mb-5">
      <div className="col-8 offset-md-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </form>
      </div>
    </div>
  );
};

const Signin = () => {
  return (
    <Router>
      <SigninForm></SigninForm>
    </Router>
  );
};

export default Signin;
