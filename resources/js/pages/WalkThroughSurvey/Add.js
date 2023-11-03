import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSuccess } from '../../store/slices/surveying'
import SurveyingForm from './Form'

const AddSurveying = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.surveying);

    useEffect(() => {
        if (success) {
            toast.success('บันทึกขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/surveyings');
        }
    }, [success]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการ Walk-through survey</h5>

                            <SurveyingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSurveying
