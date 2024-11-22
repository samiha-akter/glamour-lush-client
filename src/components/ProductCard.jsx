import axios from "axios";
import useUserData from "../hooks/useUserData";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const ProductCard = ({ product, isInWishlist, isInCart, setLatestData }) => {
  const userData = useUserData();
  const userEmail = userData.email;
  const token = localStorage.getItem("access-token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState("");

  // Wishlist Handler - Buyer
  const handleWishlist = async() => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/wishlist/add`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: { 'Content-Type': 'application/json',
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

  // Remove from wishlist - Buyer
  const handleRemoveWishlist = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/wishlist/remove`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: { 'Content-Type': 'application/json',
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

  // Cart Handler - Buyer
  const handleCart = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/cart/add`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: { 'Content-Type': 'application/json',
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

  // Remove from cart - Buyer
  const handleRemoveCart = async () => {
    await axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/cart/remove`,
        {
          userEmail: userEmail,
          productId: product._id,
        },
        {
          headers: { 'Content-Type': 'application/json',
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


  // Remove product - Seller
  const handleRemoveProduct = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/my-products/${product._id}`,
        {
          headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product removed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setLatestData((prev) => !prev); // Refresh data
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to remove product",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: true,
      });
      console.error("Error removing product:", error);
    }
  };

  // Edit Product Details - Seller
  const handleEditProduct = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/my-products/${product._id}`,
        { price: Number(updatedPrice) },
        {
          headers: {  'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false); // Close the modal
        setLatestData((prev) => !prev); // Refresh data
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update product",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: true,
      });
    }
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
        {userData.role === "seller" && product.sellerEmail === userData.email && (
          <>
            <button
              className="btn bg-red-600 text-white"
              onClick={handleRemoveProduct}
            >
              Remove Product
            </button>
          </>
        )}
        {userData.role === "seller" && product.sellerEmail === userData.email && (
          <div className="card-actions justify-end">
            <button
              className="btn bg-purple-400 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Info
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h3 className="text-lg font-bold mb-4">Update Product Price</h3>
            <input
              type="number"
              className="input input-bordered w-full mb-4"
              placeholder="Enter New Price"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="btn bg-red-600 text-white mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-green-600 text-white"
                onClick={handleEditProduct}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductCard;
