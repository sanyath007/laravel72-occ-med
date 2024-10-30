import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../../context/globalContext';
import { getMonthly } from '../../../../store/slices/monthly';
import MonthlyForm from '../../../../components/Summary/MonthlyForm';
import Loading from '../../../../components/Loading';

const EditToxicologyMonthly = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { monthly, isLoading } = useSelector(state => state.monthly);
    const { setGlobal } = useContext(GlobalContext);
    const division = 4;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'toxicologies', name: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'toxicologies/summary' },
                { id: 'edit', name: 'แก้ไขสรุปผลงาน', path: null, active: true },
            ]
        }))
    }, [])

    useEffect(() => {
        if (id) dispatch(getMonthly({ id }));
    }, [id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสรุปผลงาน (งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม)</h5>

                            {isLoading ? (
                                <div className="text-center"><Loading /></div>
                            ) : (
                                <MonthlyForm
                                    monthly={monthly}
                                    division={division}
                                    routePath="/toxicologies/summary"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditToxicologyMonthly