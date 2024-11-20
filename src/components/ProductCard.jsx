import axios from "axios";
import useUserData from "../hooks/useUserData";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
const ProductCard = ({ product, isInWishlist, isInCart, setLatestData }) => {
  const userData = useUserData();
  const userEmail = userData.email;
  const token = localStorage.getItem("access-token");

  const handleWishlist = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/wishlist/add`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added to Your Wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleRemoveWishlist = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/wishlist/remove`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product removed from Your Wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
          setLatestData((prev) => !prev);
        }
      });
  };

  const handleCart = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/cart/add`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added to Your Cart",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleRemoveCart = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/cart/remove`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product removed from Your Cart",
            showConfirmButton: false,
            timer: 1500,
          });
          setLatestData((prev) => !prev);
        }
      });
  };

  return (
    <div className="card shadow-xl">
      <figure>
        <img src={product.imageURL} alt={product.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <h3 className="card-title text-base">{product.brand}</h3>
        <h3 className="card-title text-base">{product.category}</h3>
        {product.stock > 0 && (
          <h4 className="card-title text-base text-green-600">In Stock</h4>
        )}
        {product.stock <= 0 && (
          <h4 className="card-title text-base text-red-600">Out of Stock</h4>
        )}

        <p className="text-sm">
          {product.description.length < 50
            ? `${product.description}`
            : `${product.description.slice(0, 60)}...`}
        </p>
        {/* <p className="text-sm">{product.description}</p> */}
        <h4 className="card-title text-lg text-purple-500 font-bold">
          ${product.price}
        </h4>
        <NavLink
          to={`/products/${product._id}`}
          className="btn bg-transparent hover:bg-purple-400 hover:text-white border-2 border-purple-400 text-black "
        >
          View Details
        </NavLink>
        {userData.role === "buyer" && (
          <>
            {isInWishlist ? (
              <button
                className="btn bg-red-600 text-white"
                onClick={handleRemoveWishlist}
              >
                Remove from Wishlist
              </button>
            ) : (
              <button
                className="btn bg-purple-400 text-white"
                onClick={handleWishlist}
              >
                Add To Wishlist
              </button>
            )}
          </>
        )}
        {userData.role === "buyer" && (
          <div className="card-actions justify-end">
            {isInCart ? (
              <button
                className="btn bg-red-600 text-white"
                onClick={handleRemoveCart}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="btn bg-purple-400 text-white"
                onClick={handleCart}
              >
                Add To Cart
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
