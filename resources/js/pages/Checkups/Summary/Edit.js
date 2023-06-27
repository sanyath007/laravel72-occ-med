import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../context/globalContext';
import MonthlyForm from '../../../components/Summary/MonthlyForm';
import Loading from '../../../components/Loading';
import { getMonthly } from '../../../store/slices/monthly';

const EditcheckupMonthly = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { monthly, isLoading } = useSelector(state => state.monthly);
    const { setGlobal } = useContext(GlobalContext);
    const division = 6;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสรุปผลงาน (งานตรวจสุขภาพ)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'checkups', name: 'งานตรวจสุขภาพ', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'checkups/summary' },
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
                            <h5 className="card-title">แก้ไขสรุปผลงาน (งานตรวจสุขภาพ)</h5>

                            {isLoading ? (
                                <div className="text-center"><Loading /></div>
                            ) : (
                                <MonthlyForm
                                    monthly={monthly}
                                    division={division}
                                    routePath="/checkups/summary"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditcheckupMonthly