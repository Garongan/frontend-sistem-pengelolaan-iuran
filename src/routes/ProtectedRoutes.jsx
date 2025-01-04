import useAuthService from "@/services/useAuthService";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, path }) => {
    const authService = useAuthService();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (
                !localStorage.getItem("user") ||
                !(await authService.validateToken())
            ) {
                navigate("/login");
            } else if (
                path === "register/admin" &&
                JSON.parse(localStorage.getItem("user")).roles.includes(
                    "ROLE_SUPER_ADMIN"
                )
            ) {
                navigate("/register/admin");
            }
        };
        checkToken();
    }, [navigate, path]);

    return <>{children}</>;
};

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
    path: PropTypes.string,
};

export default ProtectedRoutes;
