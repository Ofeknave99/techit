import React, { FunctionComponent } from "react";
import { Link, NavLink,useNavigate  } from "react-router-dom";

interface NavBarProps {
   userInfo:any
   setUserInfo:Function;
    
}

const NavBar: FunctionComponent<NavBarProps> = ({userInfo,setUserInfo}) => {
    let navigate= useNavigate()
 
  return (
  <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            Techit
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {userInfo.email&&(
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/Products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
             
          <button className="btn btn-primary" onClick={()=>{ sessionStorage.removeItem("userInfo"); 
          setUserInfo({email:false,isAdmin:false});
          navigate("/")
            
          }}>
  Logout
</button>

             </form>
          </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
