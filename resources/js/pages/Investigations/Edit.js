import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getInvestigation, resetSuccess } from '../../store/slices/investigation'
import InvestigationForm from './Form'

const EditInvestigation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { investigation, loading, success } = useSelector(state => state.investigation);

    useEffect(() => {
        if (id) {
            dispatch(getInvestigation(id));
        }
    }, [id]);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/guidelines');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสอบสวนโรค/อุบัติเหตุจากงานและสิ่งแวดล้อม</h5>

                            <InvestigationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditInvestigation
