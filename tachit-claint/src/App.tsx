import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import PageNotFond from "./components/PageNotFond";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Products from "./components/Products";
import AddNewProduct from "./components/AddNewProduct";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";


function App() {
 let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  return (
    <div className="App">
      <ToastContainer />
      <Router>
      <NavBar userInfo={userInfo} setUserInfo={setUserInfo} />
     
        <Routes>
          <Route path="/" element={<Login setUserInfo={setUserInfo} />} />
          <Route path="/home" element={<Home />} />
         
          <Route path="/registration" element={<Register setUserInfo={setUserInfo}  />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Cart" element={<Cart/>} />
          
          <Route path="/Products/new" element={<AddNewProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
          <Route path="/Products" element={<Products userInfo={userInfo}   />} />
        


          <Route path="*" element = {<PageNotFond/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
