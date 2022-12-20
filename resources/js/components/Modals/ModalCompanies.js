import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { getCompanies } from '../../store/company'
import Pagination from '../Pagination'

const ModalCompanies = ({ isOpen, hideModal, ...props }) => {
    const dispatch = useDispatch()
    const { companies, pager, loading } = useSelector(state => state.company)

    useEffect(() => {
        dispatch(getCompanies({ data: 'test' }))
    }, [])

    const handlePageBtnClicked = (path) => {
        dispatch(getCompanies(path))
    }

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการสถานที่ทำงาน</Modal.Header>
            <Modal.Body>
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
                        {loading && <p>Loading...</p>}
                        {companies && companies.map((company, row) => (
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
                                        <Link to={`/companies/${company.id}/detail`} className="btn btn-primary btn-sm">
                                            <i className="bi bi-download"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Pagination pager={pager} handlePageBtnClicked={handlePageBtnClicked} />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCompanies
