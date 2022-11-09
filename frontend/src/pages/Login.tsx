import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = () => {};
  const onChange = () => {};
  return (
    <div>
      Login
      <Link to="/">Home</Link>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
