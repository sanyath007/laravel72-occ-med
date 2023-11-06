import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../context/globalContext'
import { getInvestigation, resetSuccess } from '../../store/slices/investigation'
import InvestigationForm from './Form'
import Loading from '../../components/Loading'

const EditInvestigation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { investigation, loading, success } = useSelector(state => state.investigation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'investigations', name: 'รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: '/investigations' },
                { id: 'edit', name: 'แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getInvestigation(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/investigations');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && investigation) && (
                                <InvestigationForm id={id} investigation={investigation} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditInvestigation
