;import { NavLink } from "react-router-dom";
const FeaturedProductCard = ({ product }) => {
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
        
        
      </div>
    </div>
  );
};

export default FeaturedProductCard;
