import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {PaginationInfo} from "../../../models/clientOnly/paginationInfo";
import {Pagination} from "@mui/material";
import {inspect} from "util";
import styles from './searchResultPagination.module.css'
import moment from "moment";


interface PaginationProps {
    pagination?: PaginationInfo;
    currentPage?: number;
    currenCount?: number;
    totalCount?: number;
    handlePageChange?: any;
}

const SearchResultPagination: FC<PaginationProps> = ({pagination,
                                             currentPage,
                                             currenCount,totalCount , handlePageChange}) => {
    const [numberOfPages, setNumberOfPages] = useState<number>();
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(currentPage) {
            setPage(currentPage);
        }
        const recordsPerPage = 300;
        if (totalCount) {
            const nPages= Math.ceil(totalCount / recordsPerPage);
            setNumberOfPages(nPages);
        }
    },[totalCount]);

    const onPageChange = (event: ChangeEvent<unknown>, pageNumber: number) => {
        handlePageChange(pageNumber);
        setPage(pageNumber);
    };

    return (
        <>
            <div className={styles.container}>
                <div>{totalCount}</div>
                <Pagination count={numberOfPages} page={page} onChange={onPageChange} />
            </div>
        </>
    );
};

export default SearchResultPagination;
