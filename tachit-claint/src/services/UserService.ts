import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode"

let api: string = `${process.env.REACT_APP_API}`;

export function checkUser(userToCheck: User) {
  return axios.post(`${api}/login`, userToCheck);
}



export function adduser(newUser: User) {
  return axios.post(`${api}/register`, newUser);
}

export function getUserDetails() {
  return axios.get(`${api}/profile`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function getTokenDetails() {
  let token = JSON.parse(sessionStorage.getItem("token") as string).token;
  return jwt_decode(token);
}









