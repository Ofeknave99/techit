import React, { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMsg } from "../services/feedbackServicw";
import { addProduct } from "../services/ProductsService";
import { Field, FieldProps } from "formik";
import Product from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import { log } from "console";

interface AddNewProductProps {
}

const AddNewProduct: FunctionComponent<AddNewProductProps> = () => {
    let navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
  
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      price: yup.number().required("Price is required"),
      category: yup.string().required("Category is required"),
      description: yup.string().required("Description is required"),
      image: yup.mixed().required("Image is required"),
    }),
    onSubmit: (values:Product,{resetForm}) => {
        addProduct(values)
        .then ((res)=>{
          successMsg("Product added successfully!");
          resetForm()
          navigate(-1)
          
          })
          .catch ((err)=> console.log(err)
          );
    },
       
  })
  
 useEffect(() => {
    formik.setFieldValue("price","")
 }, []);
  return (
    <div className="container col-md-3">
    <form className="mb-3" onSubmit={formik.handleSubmit}>
      <h6 className="display-6">Add New Product</h6>
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
      <div className="form-floating mt-3 mb-3">
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="price"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="price">Price</label>
        {formik.touched.price && formik.errors.price && (
          <p className="text-danger">{formik.errors.price}</p>
        )}
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="category"
          placeholder="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="category">Category</label>
        {formik.touched.category && formik.errors.category && (
          <p className="text-danger">{formik.errors.category}</p>
        )}
      </div>
      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="description">Description</label>
        {formik.touched.description && formik.errors.description && (
          <p className="text-danger">{formik.errors.description}</p>
        )}
      </div>
       <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="image"
          placeholder="image"
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="image">image</label>
        {formik.touched.image && formik.errors.image && (
          <p className="text-danger">{formik.errors.image}</p>
        )}
      </div>
      
         
      
      <button
        disabled={!formik.isValid || !formik.dirty}
        type="submit"
        className="btn btn-success w-100 mt-3"
      >
        Add
      </button>
    </form>
    </div>
  );
};

export default AddNewProduct;
