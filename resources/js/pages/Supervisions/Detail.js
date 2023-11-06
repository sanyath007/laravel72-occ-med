import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSupervision } from '../../store/slices/supervision'

const SupervisionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { supervision, loading } = useSelector(state => state.supervision);

    useEffect(() => {
        if (id) {
            dispatch(getSupervision(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดการนิเทศ</h5>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupervisionDetail
