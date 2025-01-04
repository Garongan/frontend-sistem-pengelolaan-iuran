import { Outlet } from "react-router-dom";

const TableLayout = () => {
    return (
        <>
            <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default TableLayout;
