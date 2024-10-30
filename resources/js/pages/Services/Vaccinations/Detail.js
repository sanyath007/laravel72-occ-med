import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../context/globalContext'
import { getVaccination } from '../../../store/slices/vaccination'
import Loading from '../../../components/Loading'

const VaccinationDetail = () => {
    const { id } = useParams();
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { vaccination, loading } = useSelector(state => state.vaccination);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายละเอียดการสร้างเสริมภูมิคุ้มกันโรค',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'vaccinations', name: 'รายการสร้างเสริมภูมิคุ้มกันโรค', path: '/services/vaccinations' },
                { id: 'detail', name: 'รายละเอียดการสร้างเสริมภูมิคุ้มกันโรค', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getVaccination(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && vaccination) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VaccinationDetail
