import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import PropTypes from "prop-types";

const PaginationComponent = ({ paging, searchParams, setSearchParams }) => {
    const { page, totalPages, hasNext, hasPrevious } = paging;
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handlePrevious = () => {
        if (hasPrevious) {
            setSearchParams({ ...searchParams, page: page - 1 });
        }
        scrollToTop();
    };

    const handleChangePage = (page) => {
        setSearchParams({ ...searchParams, page: page });
        scrollToTop();
    };

    const handleNext = () => {
        if (hasNext) {
            setSearchParams({ ...searchParams, page: page + 1 });
        }
        scrollToTop();
    };

    const renderPaginationItems = () => {
        const paginationItems = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => handleChangePage(i)}
                            isActive={i === page}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (i === page - 2 || i === page + 2) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        return paginationItems;
    };

    return (
        <Pagination>
            <PaginationContent>
                {page === 1 ? null : (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={handlePrevious}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                )}
                {renderPaginationItems()}
                {page === totalPages ? null : (
                    <PaginationItem>
                        <PaginationNext
                            onClick={handleNext}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

PaginationComponent.propTypes = {
    paging: PropTypes.object,
    searchParams: PropTypes.object,
    setSearchParams: PropTypes.func,
};

export default PaginationComponent;
