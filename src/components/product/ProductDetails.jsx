import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import Heading from "../Heading";
import axios from "axios";

function ProductDetails() {
  const param = useParams();
  const id = param.id;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products?id=${id}`
        );
        const product = res.data;
        setProduct(product.product);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchProduct();
  }, []);
  return (
    <div className="mt-9">
      <Heading text={"Product Details"} />
      <div className="pl-9">
        <div className="hero-content flex-col lg:flex-row gap-5 justify-start">
          {product?.imageURL && (
            <img
              src={product.imageURL}
              className="object-cover w-full max-w-[500px] h-auto rounded-lg"
            />
          )}
          <div>
            <h1 className="text-5xl font-bold">{product?.title}</h1>
            <p className="text-xl font-bold mt-3">{product?.brand}</p>
            <p className="text-xl font-bold mt-3">{product?.category}</p>
            <hr className="my-3" />
            <p className="py-3">{product?.description}</p>

            <hr className="my-3 " />
            <table className="border-none mb-5">
              <tbody>
                <tr>
                  <td className="p-2 font-bold">Price</td>
                  <td className="p-2">${product?.price}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Status</td>
                  {product?.stock > 0 && (
                    <td className="p-2 text-green-600 font-semibold">
                      In Stock
                    </td>
                  )}
                  {product?.stock <= 0 && (
                    <td className="p-2 text-red-600 font-semibold">
                      Out of Stock
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
