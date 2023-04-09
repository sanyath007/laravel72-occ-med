import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { getReportBullets } from '../../store/reportBullet'
import Pagination from '../Pagination'

const ModalReportBullets = ({ isOpen, hideModal, onSelected, ...props }) => {
    const dispatch = useDispatch()
    const { bullets, pager, loading } = useSelector(state => state.reportBullet)
    const [filterings, setFilterings] = useState({ name: '', division: '' })

    useEffect(() => {
        fetchBullets()
    }, [filterings])

    const fetchBullets = (path='/api/report-bullets?page=') => {
        /** Filtering params */
        const name = filterings.name ? filterings.name : ''
        const division = filterings.division ? filterings.division : ''

        dispatch(getReportBullets({ path: `${path}&division=${division}&name=${name}` }))
    }

    const handlePageBtnClicked = (path) => {
        fetchBullets(path)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFilterings(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>รายการหัวข้อรายงานทั้งหมด</Modal.Header>
            <Modal.Body>
                <div className="alert border-dark alert-dismissible fade show" role="alert">
                    <div className="row">
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="division"
                                value={filterings.division}
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                                placeholder="ค้นหาด้วย ICD-10"
                            />
                        </div>
                        <div className="col-md-9">
                            <input
                                type="text"
                                name="name"
                                value={filterings.name}
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                                placeholder="ค้นหาด้วยชื่อหัวข้อรายงาน"
                            />
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>ลำดับที่</th>
                            <th scope="col">ชื่อหัวข้อรายงาน</th>
                            <th scope="col" style={{ width: '40%' }}>หน่วยงาน</th>
                            <th scope="col" style={{ width: '5%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {(!loading && bullets) && bullets.map((bullet, row) => (
                            <tr key={bullet.id}>
                                <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                <td style={{ textAlign: 'center' }}>{bullet.bullet_no}</td>
                                <td>{bullet.name}</td>
                                <td>{bullet.division.name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => onSelected(bullet)}
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
                    handlePageBtnClicked={handlePageBtnClicked}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReportBullets
