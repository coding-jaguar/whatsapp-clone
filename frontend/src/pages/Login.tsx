import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register, setRegister] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let endpoint = import.meta.env.VITE_BASE_URL + "/auth";
    if (register) {
      endpoint = endpoint + "/register";
    } else {
      endpoint = endpoint + "/login";
    }
    try {
      const response = await api.post(endpoint, { ...formData });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {register && (
          <div>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              className="px-10 py-5 text-3xl"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <input
            name="email"
            type="text"
            placeholder="Enter email"
            className="px-10 py-5 text-3xl mt-4"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="text"
            placeholder="Enter password"
            className="px-10 py-5 text-3xl mt-4"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {register && (
          <div>
            <input
              name="confirmPassword"
              type="text"
              placeholder="Re-enter password"
              className="px-10 py-5 text-3xl mt-4"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}

        <button className=" bg-fuchsia-700 text-gray-900 mt-5 px-10 py-5 hover:bg-fuchsia-500 hover:text-black transition-colors ">
          Submit
        </button>
      </form>

      <div className="text-white text-2xl mt-2 text-center">
        Already Registered?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setRegister((prev) => !prev)}
        >
          {register ? "Click here to login" : "Click here to Join Us"}
        </span>
      </div>
    </div>
  );
};
export default Login;
