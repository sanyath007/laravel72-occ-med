import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getVisitation } from '../../store/slices/visitation'

const VisitationDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { visitation, loading } = useSelector(state => state.visitation);

    useEffect(() => {
        if (id) {
            dispatch(getVisitation(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดการติดตามเยี่ยมบ้าน</h5>

                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisitationDetail
