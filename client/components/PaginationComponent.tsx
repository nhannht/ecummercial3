import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {ResultMetadata} from "@/lib/global.ts";

export const PaginationComponent = (props: {
    searchParams: URLSearchParams,
    setSearchParams: (newSearchParams: { page: string }) => void,
    resultMetaData: ResultMetadata
}) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={"hover:cursor-pointer focus:outline-none"}
                        onClick={() => props.setSearchParams({page: (parseInt(props.searchParams.get("page") || "1") - 1).toString()})}
                    />
                </PaginationItem>
                {Array.from({length: Math.ceil(props.resultMetaData.totalCount / props.resultMetaData.pageSize)}, (_, index) => {
                    const pageNumber = index + 1;
                    const currentPage = parseInt(props.searchParams.get("page") || "1");
                    const totalPages = Math.ceil(props.resultMetaData.totalCount / props.resultMetaData.pageSize);

                    if (totalPages > 5) {
                        if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => props.setSearchParams({page: pageNumber.toString()})}
                                        className={pageNumber === currentPage ? "border border-dark bg-gray-200 cursor-pointer" : "cursor-pointer"}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                            );
                        } else {
                            return null;
                        }
                    } else {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => props.setSearchParams({page: pageNumber.toString()})}
                                    className={pageNumber === currentPage ? "border border-dark bg-gray-200 cursor-pointer" : "cursor-pointer"}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                })}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => props.setSearchParams({page: (parseInt(props.searchParams.get("page") || "1") + 1).toString()})}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}