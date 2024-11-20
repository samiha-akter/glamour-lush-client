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
    const userData = { email, role, status, wishlist };

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
    <div className="hero bg-base-300 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm font-light">
                  Password is required!
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm font-light">
                  Password must have atleast 6 characters!
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") != value) {
                      return "Your passwords do not match.";
                    }
                  },
                })}
              />
              {errors.confirmPAssword && (
                <p className="text-red-500 text-sm font-light">
                  Both passwords don't match.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
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
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-purple-400 text-white">
                Register
              </button>
            </div>

            <GoogleLogin />

            <p className="my-4 text-sm font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-500 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
