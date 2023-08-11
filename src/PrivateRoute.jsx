import React from "react";
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { TokenServices } from "./services/TokenServices";

export default function PrivateRoute({ element, ...props }){
      const location=useLocation();
      const isAuthenticated=TokenServices.getToken();
      if(isAuthenticated){
        return(
            <Outlet/>
        )
      }else{
        <Navigate to="/prijava" state={{ from: location }} />
      }

}