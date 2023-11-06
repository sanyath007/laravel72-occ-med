import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getGuideline } from '../../store/slices/guideline'

const GuidelineDetail = () => {
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
                            <h5 className="card-title">รายละเอียดจัดทำแนวทาง/แบบฟอร์ม/ขั้นตอนการทำงาน</h5>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GuidelineDetail
