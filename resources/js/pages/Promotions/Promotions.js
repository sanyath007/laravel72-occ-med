import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { FaPlus } from 'react-icons/fa'
import { getCheckups } from '../../store/checkup'
import { calcAgeY } from '../../utils/calculator'
import { currencyFormat, thdateBEFormat } from '../../utils/formatter'
import Pagination from '../../components/Pagination'

const Promotions = () => {
    const dispatch = useDispatch()
    const { checkups, pager, loading } = useSelector(state => state.checkup)
    const { setGlobal } = useContext(GlobalContext)

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการให้บริการ (งานสร้างเสริมสุขภาพฯ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานงานสร้างเสริมสุขภาพฯ', path: '/promotions' },
                { id: 'list', name: 'รายการให้บริการ', path: null, active: true }
            ]
        }))
    }, [])

    useEffect(() => {
        dispatch(getCheckups({ path: '/api/checkups' }))
    }, [])
    
    const handlePageBtnClicked = (path) => {
        dispatch(getCheckups({ path }))
    }

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายการให้บริการ</h5>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-end mb-3">
                                        <Link to="/promotions/new" className="btn btn-primary">
                                            <FaPlus className="me-1" />
                                            สร้างรายการ
                                        </Link>
                                    </div>

                                    <table className="table table-striped table-bordered">

                                    </table>

                                    <Pagination
                                        pager={pager}
                                        handlePageBtnClicked={handlePageBtnClicked}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Promotions
