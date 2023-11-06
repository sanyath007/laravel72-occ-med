import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getGuideline, resetSuccess } from '../../store/slices/guideline'
import VaccinationForm from './Form'

const EditVaccination = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { guideline, loading, success } = useSelector(state => state.guideline);

    useEffect(() => {
        if (id) {
            dispatch(getGuideline(id));
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
                            <h5 className="card-title">แก้ไขสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            <VaccinationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditVaccination
