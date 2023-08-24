import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { deleteProduct, getProduct } from "../services/ProductsService";
import Product from "../interfaces/Product";
import { Link } from "react-router-dom";
import { successMsg } from "../services/feedbackServicw";
import { log } from "console";
import { addToCart } from "../services/cartsService";


interface ProductsProps {
    userInfo:any
}
 
const Products: FunctionComponent<ProductsProps> = ({userInfo}) => {
  
    let [productsChanged, setProductsChanged] = useState<boolean>(false);
  let [Products,setProducts] =useState<Product[]>([]);
  let render = () => {
    setProductsChanged(!productsChanged);
  };
useEffect (()=>{
    getProduct()
    .then ((res )=> setProducts(res.data))
    .catch ((err)=>console.log(err)
    );
},[productsChanged])
let handleDelete = (_id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(_id)
        .then((res) => {
          render()
          successMsg("Product deleted successfully!");
        })
        .catch((err) => console.log(err));
    }
  };
let handleAddToCart = (product: Product) => {
    addToCart(product)
      .then((res) => successMsg("Product added to cart!"))
      .catch((err) => console.log(err));
  };

  
    return ( <>
    <>
      
      <h1>Products</h1>
      {userInfo.isAdmin && (
        <Link to="new" className="btn btn-success"><i className="fa-solid fa-plus"></i>
          Add Product
        </Link>
      )}
      {Products.length ? (
        <div className="container mb-2">
          <div className="row">
            {Products.map((product: Product) => (
              <div
                key={product._id}
                className="card col-md-4 mx-2 mb-3"
                style={{ width: "18rem" }}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ width: "16.5rem", height: "16.5rem" }}
                />
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    {product.category}
                  </h6>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-success">{product.price} ₪</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                  </button>
                  {userInfo.isAdmin && (
                    <>
                      <Link to={`update/${product._id}`} className="btn btn-warning mx-1">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link to="" className="btn 
                      btn-danger"  onClick={() => handleDelete(product._id as string)}>
                        
                        <i className="fa-solid fa-trash"></i>
                       
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No products</p>
      )}
    </>
    
    
    </> );
}
 
export default Products;