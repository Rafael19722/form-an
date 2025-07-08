import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    return children;
}