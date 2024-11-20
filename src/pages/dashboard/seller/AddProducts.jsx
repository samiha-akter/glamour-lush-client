import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Heading from "../../../components/Heading";

export default function AddProducts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const onSubmit = (data) => {
    const title = data.title;
    const brand = data.brand;
    const price = parseFloat(data.price);
    const stock = parseFloat(data.stock);
    const category = data.category;
    const imageURL = data.imageURL;
    const description = data.description;
    const sellerEmail = user.email;

    const product = {
      title,
      brand,
      price,
      stock,
      category,
      imageURL,
      description,
      sellerEmail,
    };

    const token = localStorage.getItem("access-token");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/add-products`, product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Added",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      });
  };

  return (
    <div>
      <Heading text={"Add New Product"}/>
      <div>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex gap-8">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Product Title</span>
              </label>
              <input
                type="text"
                placeholder="Product Title"
                className="w-full p-2 border border-purple-400 rounded-md"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-red-500 text-sm font-light">
                  Product title is required!
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <input
                type="text"
                placeholder="Brand"
                className="w-full p-2 border border-purple-400 rounded-md"
                {...register("brand", { required: true })}
              />
              {errors.brand?.type === "required" && (
                <p className="text-red-500 text-sm font-light">
                  Brand is required!
                </p>
              )}
            </div>
          </div>
          <div className="lg:flex gap-8">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 border border-purple-400 rounded-md"
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <p className="text-red-500 text-sm font-light">
                  Price is required!
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Stock Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Stock Quantity"
                className="w-full p-2 border border-purple-400 rounded-md"
                {...register("stock", { required: true })}
              />
              {errors.stock?.type === "required" && (
                <p className="text-red-500 text-sm font-light">
                  Stock Quantity is required!
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Product Category</span>
              </label>
              <input
                type="text"
                placeholder="Product Category"
                className="w-full p-2 border border-purple-400 rounded-md"
                {...register("category", { required: true })}
              />
              {errors.category?.type === "required" && (
                <p className="text-red-500 text-sm font-light">
                  Category is required!
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text">Product Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Product Image URL"
              className="w-full p-2 border border-purple-400 rounded-md"
              {...register("imageURL", { required: true })}
            />
            {errors.imageURL?.type === "required" && (
              <p className="text-red-500 text-sm font-light">
                Product image URL is required!
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Product Description"
              className="w-full p-2 border border-purple-400 rounded-md"
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <p className="text-red-500 text-sm font-light">
                Description is required!
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-purple-400 text-white">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
