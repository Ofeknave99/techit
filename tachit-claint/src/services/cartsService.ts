import axios from "axios";
import Cart from "../interfaces/Cart";
import Product from "../interfaces/Product";
import _ from "lodash";

let api: string = `${process.env.REACT_APP_API}/carts`;


// get cart by userId
export function getCart() {
  return axios.get(`${api}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function createCart(userId:number){
    return axios.post(api,{userId,products:[],active:true});}

// add to cart / update cart
export function addToCart(productToAdd: Product) {
  let product = _.pick(productToAdd, [
    "_id",
    "name",
    "category",
    "description",
    "price",
    "image",
  ]);
  return axios.post(api, product, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}