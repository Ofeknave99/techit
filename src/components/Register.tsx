import React, { FunctionComponent } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { adduser, getTokenDetails } from "../services/UserService";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMsg, successMsg } from '../services/feedbackServicw';
import { createCart } from '../services/cartsService';
import { userInfo } from 'os';



interface RegisterProps {
     setUserInfo:Function;
}
 
const Register: FunctionComponent<RegisterProps> = ({ setUserInfo}) => {
     let  Navigate = useNavigate()
    const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
        Navigate("/home");
  adduser({...values,isAdmin:false})
    .then((res) => {
      successMsg(`Registration successful ${values.email}`); 
      
     sessionStorage.setItem(
            "token",
            JSON.stringify({
              token: res.data,
            })
          );
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              email:  (getTokenDetails() as any).email,
              isAdmin: (getTokenDetails() as any).isAdmin,
              userId: (getTokenDetails() as any)._id,
            })
          );
          
    })
    .catch((err) => {
      errorMsg("Failed to register"); 
      console.error("Failed to add user:", err);
    });
},

  });
   
    return ( <>
     <div className="container col-md-3">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="display-3">Register</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="email">Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="password">Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Register
        </button>
      </form>
    <Link to="/" className="mt-3">Come To Login</Link>
    </div>


    </> );
}
 
export default Register;