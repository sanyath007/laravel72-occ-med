import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Pagination } from 'react-bootstrap'
import api from '../../api'
import { currencyFormat } from '../../utils/formatter'

const ModalIcd10s = ({ isOpen, hideModal, ...props }) => {
    const [icd10s, setIcd10s] = useState([])
    const [pager, setPager] = useState(null)
    const [filterings, setFilterings] = useState({ icd10: '', desc: '' })

    useEffect(() => {
        getIcd10s()

        return () => getIcd10s
    }, [filterings])

    const getIcd10s = async (path='/api/icd10s?page=') => {
        /** Filtering params */
        console.log(path);
        const code = filterings.icd10 ? filterings.icd10 : ''
        const name = filterings.desc ? filterings.desc : ''
        /** Filtering params */

        const res = await api.get(`${path}&code=${code}&name=${name}`)

        if (res.data) {
            const { data, ...pager } = res.data.icd10s

            setIcd10s(data)
            setPager(pager)
        }
    }

    const handlePageBtnClicked = (path) => {
        getIcd10s(path)
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
                        {icd10s && icd10s.map((icd, row) => (
                            <tr key={icd.code}>
                                <th scope="row" style={{ textAlign: 'center' }}>{row+1}</th>
                                <td style={{ textAlign: 'center' }}>{icd.code}</td>
                                <td>{icd.name}</td>
                                <td>{icd.tname}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <Link to={`/icd10s/${icd.code}/detail`} className="btn btn-primary btn-sm">
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
                <div className="d-flex justify-content-between align-items-center my-0 w-100">
                    <span className="mb-0">รายการทั้งหมด {currencyFormat(pager?.total)} รายการ</span>
                    <span className="mb-0">หน้า {currencyFormat(pager?.current_page)}/{currencyFormat(pager?.last_page)}</span>
                    <Pagination className="mb-0">
                        <Pagination.First
                            disabled={pager?.current_page === 1}
                            onClick={() => handlePageBtnClicked(pager?.first_page_url)}
                        />
                        <Pagination.Prev
                            disabled={pager?.current_page === 1}
                            onClick={() => handlePageBtnClicked(pager?.prev_page_url)}
                        />
                        <Pagination.Next
                            disabled={pager?.current_page === pager?.last_page}
                            onClick={() => handlePageBtnClicked(pager?.next_page_url)}
                        />
                        <Pagination.Last
                            disabled={pager?.current_page === pager?.last_page}
                            onClick={() => handlePageBtnClicked(pager?.last_page_url)}
                        />
                    </Pagination>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalIcd10s
