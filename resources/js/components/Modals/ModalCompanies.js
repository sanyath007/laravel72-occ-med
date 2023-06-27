import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { getCompanies } from '../../store/slices/company'
import Pagination from '../Pagination'
import CompanyFilter from '../Company/CompanyFilter'

const ModalCompanies = ({ isOpen, hideModal, onSelected, ...props }) => {
    const dispatch = useDispatch()
    const { companies, pager, loading } = useSelector(state => state.company)
    const [queryStrings, setQueryStrings] = useState('')

    useEffect(() => {
        console.log('on queryStrings changed...');
        fetchCompanies()
    }, [queryStrings])

    const fetchCompanies = (path='/api/companies?page=') => {
        dispatch(getCompanies({ path: `${path}${queryStrings}` }))
    }

    const handlePageClick = (path) => {
        fetchCompanies(path)
    }

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการสถานที่ทำงาน</Modal.Header>
            <Modal.Body>
                <div className="alert border-dark alert-dismissible fade show" role="alert">
                    <CompanyFilter setQueryStrings={setQueryStrings} />
                </div>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '30%' }}>ชื่อสถานประกอบการ</th>
                            <th scope="col">ที่อยู่</th>
                            <th scope="col" style={{ width: '15%', textAlign: 'center' }}>ประเภท</th>
                            <th scope="col" style={{ width: '6%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {(!loading && companies) && companies.map((company, row) => (
                            <tr key={company.id}>
                                <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                <td>{company.name}</td>
                                <td>
                                    {`${company.address} หมู่${company.moo ? company.moo : '-'} 
                                        ถนน${company.road ? company.road : '-'} 
                                        ต.${company.tambon?.tambon} 
                                        อ.${company.amphur?.amphur} 
                                        จ.${company.changwat?.changwat} ${company.zipcode}`}
                                </td>
                                <td style={{ textAlign: 'center' }}>{company.type?.name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => onSelected(company)}
                                        >
                                            <i className="bi bi-download"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Pagination
                    pager={pager}
                    onPageClick={handlePageClick}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCompanies
