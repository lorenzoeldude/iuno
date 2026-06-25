import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.is_admin) {
        return <Navigate to="/" />;
    }

    return children;
}

export default AdminRoute;