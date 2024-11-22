import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await Login(data.email, data.password);
    navigate("/");
  };
  return (
    <div class=" flex items-center my-5 justify-center w-full">
      <div class="bg-white lg:shadow-xl rounded-lg px-8 py-6 lg:w-2/5">
        <h1 class="text-2xl font-bold text-center mb-4 ">
          Welcome to{" "}
          <span className="italic">
            Glamour <span className="text-purple-400">Lush</span>
          </span>
        </h1>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm font-light">
                Email is required!
              </p>
            )}
          </div>
          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters!",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must include at least one uppercase letter!",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must include at least one lowercase letter!",
                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    "Password must include at least one number!",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must include at least one special character!",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-light">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Buttons */}
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-purple-400 text-white">
              Login
            </button>
          </div>
          {/* Social Login */}
          <GoogleLogin />
          {/* Navigation */}
          <p className="my-4 text-sm font-light">
            New to Our Site?
            <Link to="/register" className="text-purple-500 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
