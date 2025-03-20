import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/globalContext'
import { getInvestigation, resetSuccess } from '../../../store/slices/investigation'
import Loading from '../../../components/Loading'
import InvestigationForm from './Form'

const EditInvestigation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { investigation, isLoading, isSuccess } = useSelector(state => state.investigation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'investigations', name: 'รายการสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม', path: '/services/investigations' },
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
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/investigations');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && investigation) && (
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
