import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess, getSurveying } from '../../../store/slices/surveying'
import Loading from '../../../components/Loading'
import EnvironmentForm from './Form'

const EditSanitation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { surveying, loading, success } = useSelector(state => state.surveying);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขตรวจประเมินมาตรฐาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'environments', name: 'รายการตรวจประเมินมาตรฐาน', path: '/services/environments' },
                { id: 'edit', name: 'แก้ไขตรวจประเมินมาตรฐาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getSurveying(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/environments');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขตรวจประเมินมาตรฐาน</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && surveying) && (
                                <EnvironmentForm id={id} surveying={surveying} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditSanitation
