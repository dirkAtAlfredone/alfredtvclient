import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import BackdropLoader from "./BackdropLoader";

export default function ProtectedRoute({children}){
    const {user, init} = useAuth();

    if(init){
        return user ? children : <Navigate to="/authenticate" replace/>
    } else {
        return <BackdropLoader open={true}/>
    }
}