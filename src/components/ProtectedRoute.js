import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";

export default function ProtectedRoute({children}){
    const {user, init} = useAuth();

    console.log(init);

    if(init){
        console.log(user);
        return user ? children : <Navigate to="/authenticate" replace/>
    }
}