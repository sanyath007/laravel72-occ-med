import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { getIcd10s } from '../../store/icd10'
import Pagination from '../Pagination'

const ModalIcd10s = ({ isOpen, hideModal, onSelected, ...props }) => {
    const dispatch = useDispatch()
    const { icd10s, pager, loading } = useSelector(state => state.icd10)
    const [filterings, setFilterings] = useState({ icd10: '', desc: '' })

    useEffect(() => {
        fetchIcd10s()
    }, [filterings])

    const fetchIcd10s = (path='/api/icd10s?page=') => {
        /** Filtering params */
        const code = filterings.icd10 ? filterings.icd10 : ''
        const name = filterings.desc ? filterings.desc : ''

        dispatch(getIcd10s({ path: `${path}&code=${code}&name=${name}` }))
    }

    const handlePageBtnClicked = (path) => {
        fetchIcd10s(path)
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
            <Modal.Header closeButton>รายการ ICD-10 ทั้งหมด</Modal.Header>
            <Modal.Body>
                <div className="alert border-dark alert-dismissible fade show" role="alert">
                    <div className="row">
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="icd10"
                                value={filterings.icd10}
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                                placeholder="ค้นหาด้วย ICD-10"
                            />
                        </div>
                        <div className="col-md-9">
                            <input
                                type="text"
                                name="desc"
                                value={filterings.desc}
                                onChange={(e) => handleChange(e)}
                                className="form-control"
                                placeholder="ค้นหาด้วยรายละเอียด"
                            />
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '3%', textAlign: 'center' }}>#</th>
                            <th scope="col" style={{ width: '8%', textAlign: 'center' }}>ICD10</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={{ width: '40%' }}>ภาษาไทย</th>
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

                        {icd10s && icd10s.map((icd, row) => (
                            <tr key={icd.code}>
                                <th scope="row" style={{ textAlign: 'center' }}>{pager?.from+row}</th>
                                <td style={{ textAlign: 'center' }}>{icd.code}</td>
                                <td>{icd.name}</td>
                                <td>{icd.tname}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => onSelected(icd)}
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

export default ModalIcd10s
