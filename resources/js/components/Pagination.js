import React from 'react'
import { Pagination as BsPagination } from 'react-bootstrap'
import { currencyFormat } from '../utils/formatter'

const Pagination = ({ pager, onPageClick, ...props }) => {
    return (
        <div className="d-flex justify-content-between align-items-center my-0 w-100">
            <span className="mb-0">รายการทั้งหมด {currencyFormat(pager?.total)} รายการ</span>
            <span className="mb-0">หน้า {currencyFormat(pager?.current_page)}/{currencyFormat(pager?.last_page)}</span>
            <BsPagination className="mb-0">
                <BsPagination.First
                    disabled={pager?.current_page === 1}
                    onClick={() => onPageClick(pager?.first_page_url)}
                />
                <BsPagination.Prev
                    disabled={pager?.current_page === 1}
                    onClick={() => onPageClick(pager?.prev_page_url)}
                />
                <BsPagination.Next
                    disabled={pager?.current_page === pager?.last_page}
                    onClick={() => onPageClick(pager?.next_page_url)}
                />
                <BsPagination.Last
                    disabled={pager?.current_page === pager?.last_page}
                    onClick={() => onPageClick(pager?.last_page_url)}
                />
            </BsPagination>
        </div>
    )
}

export default Pagination
