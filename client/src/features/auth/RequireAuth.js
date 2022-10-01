import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken, selectCurrentUser } from "./authSlice"


const RequireAuth = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return (
        (token && user ) ? 
            <Outlet /> : 
            <Navigate to="/login" state={{from: location}} replace />
    )
}

export default RequireAuth