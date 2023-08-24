import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/product`;


export function getProduct() {
  return axios.get(api,{
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function getProductById(_id: string) {
  return axios.get(`${api}/${_id}`,{
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function addProduct(newProduct: Product) {
  return axios.post(api, newProduct ,{
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function updateProduct(updatedProduct: Product, _id: string) {
  return axios.put(`${api}/${_id}`, updatedProduct, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}
export function deleteProduct(_id: string) {
  return axios.delete(`${api}/${_id}`,{
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}