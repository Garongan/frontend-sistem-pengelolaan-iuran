import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";

const DashboardLayout = () => {
    return (
        <>
            <div className="flex-col md:flex pb-10">
                <DashboardHeader />
                <div className="flex-1 pt-6">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

DashboardLayout.propTypes = {
    title: PropTypes.string,
};

export default DashboardLayout;
