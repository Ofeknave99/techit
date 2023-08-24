import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import  { getCart } from "../services/cartsService";
import { userInfo } from "os";
import { deleteProduct } from "../services/ProductsService";
import { successMsg } from "../services/feedbackServicw";
import { render } from "react-dom";
import Products from "./Products";

interface CartProps {
    
}
 
const Cart: FunctionComponent<CartProps> = () => {
     
    
   
    let [productInCart,setProductInCart] = useState<Product[]>([]);
   useEffect(() => {
    getCart()
      .then((res) => setProductInCart(res.data))
      .catch((err) => console.log(err));
  }, []);
    return ( <>
      <h3 className="display-3">Cart</h3>
      {productInCart.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>

            </tr>
          </thead>
          <tbody>
            {productInCart.map((product: Product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              <button className="btn 
                      btn-danger"><i className="fa-solid fa-trash"></i></button>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products in cart</p>
      )}
    </>);
}
 
export default Cart;