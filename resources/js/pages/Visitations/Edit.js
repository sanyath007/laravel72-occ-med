import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getGuideline } from '../../store/slices/guideline'
import VisitationForm from './Form'

const EditVisitation = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { guideline, loading } = useSelector(state => state.guideline);

    useEffect(() => {
        if (id) {
            dispatch(getGuideline(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">บันทึกการติดตามเยี่ยมบ้าน</h5>

                            <VisitationForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditVisitation
