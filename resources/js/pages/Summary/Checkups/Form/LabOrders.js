import React from 'react'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'

const LabOrders = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <ul className="nav nav-tabs" id="borderedTabJustified" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            รายการตรวจทางห้องปฏิบัติการ
                        </button>
                    </li>
                </ul>
                <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                    <div className="tab-pane fade show active p-2" id="bordered-justified-home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="d-flex gap-1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                        <th style={{ textAlign: 'center' }}>รายการตรวจ</th>
                                        <th style={{ width: '15%', textAlign: 'center' }}>วันที่ตรวจ</th>
                                        <th style={{ width: '12%', textAlign: 'center' }}>ผลตรวจ</th>
                                        <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {labOrders.length > 0 
                                        ? labOrders.map(lab => (
                                            <tr>

                                            </tr>
                                        ))
                                        : (
                                            <tr>
                                                <td colSpan="5" className="text-danger" style={{ textAlign: 'center' }}>
                                                    -- ไม่พบรายการ --
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="d-flex flex-column text-center gap-1">
                                <a href="#" className="btn btn-primary btn-sm">
                                    <FaPlus />
                                </a>
                                <a href="#" className="btn btn-danger btn-sm">
                                    <FaTrashAlt />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LabOrders