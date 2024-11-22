import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import GoogleLogin from "./GoogleLogin";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const { CreateUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const role = data.role;
    const status = role === "buyer" ? "approved" : "pending";
    const wishlist = [];
    const cart = [];
    const userData = { email, role, status, wishlist, cart };

    // User Creation in Firebase and MongoDB
    CreateUser(email, password)
      .then(() => {
        return axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userData);
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div class=" flex items-center my-5 justify-center w-full">
      <div class="bg-white  lg:shadow-xl rounded-lg px-8 py-6 lg:w-2/5">
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
              <span className="label-text font-semibold">Email</span>
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
          {/* Confirm Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              className="input input-bordered"
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match!",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm font-light">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Role Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Role</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: true })}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm font-light">
                You must select your role.
              </p>
            )}
          </div>
          {/* Buttons */}
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-purple-400 text-white">
              Register
            </button>
          </div>
          {/* Social Login */}
          <GoogleLogin />
          {/* Navigation */}
          <p className="my-4 text-sm font-light">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
