import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../../context/globalContext'
import { resetSuccess, getAssessment } from '../../../store/slices/sanitation'
import Loading from '../../../components/Loading'
import SanitationForm from './Form'

const EditSanitation = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { sanitation, isLoading, isSuccess } = useSelector(state => state.sanitation);

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขตรวจประเมินมาตรฐาน',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'sanitations', name: 'รายการตรวจประเมินมาตรฐาน', path: '/services/sanitations' },
                { id: 'edit', name: 'แก้ไขตรวจประเมินมาตรฐาน', path: null, active: true }
            ]
        }))
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getAssessment(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขขอ้มูลเรียบร้อยแล้ว!!');

            dispatch(resetSuccess());

            navigate('/services/sanitations');
        }
    }, [isSuccess]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขตรวจประเมินมาตรฐาน</h5>

                            {isLoading && <div className="text-center"><Loading /></div>}

                            {(!isLoading && sanitation) && (
                                <SanitationForm id={id} data={sanitation} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditSanitation
