import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getVaccination } from '../../store/slices/vaccination'
import Loading from '../../components/Loading'

const VaccinationDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { vaccination, loading } = useSelector(state => state.vaccination);

    useEffect(() => {
        if (id) {
            dispatch(getVaccination(id));
        }
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">รายละเอียดสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                            {loading && <div className="text-center"><Loading /></div>}

                            {(!loading && vaccination) && (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VaccinationDetail
