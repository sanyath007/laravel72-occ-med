import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../../context/globalContext';
import MonthlyForm from '../../../components/Summary/MonthlyForm';
import Loading from '../../../components/Loading';
import { getMonthliesByMonth } from '../../../store/slices/monthly';

const EditPromotionMonthly = () => {
    const { month, year } = useParams();
    const dispatch = useDispatch();
    const { monthlies, isLoading } = useSelector(state => state.monthly);
    const { setGlobal } = useContext(GlobalContext);
    const division = 3;

    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'แก้ไขสรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'promotions', name: 'งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน', path: null, active: true },
                { id: 'summary', name: 'สรุปผลงาน', path: 'promotions/summary' },
                { id: 'edit', name: 'แก้ไขสรุปผลงาน', path: null, active: true },
            ]
        }))
    }, [])

    useEffect(() => {
        if (month, year) dispatch(getMonthliesByMonth({ division, month, queryStr: `?year=${year}` }));
    }, [month, year]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">แก้ไขสรุปผลงาน (งานสร้างเสริมสุขภาพและฟื้นฟูสภาพการทำงาน)</h5>

                            {isLoading ? (
                                <div className="text-center"><Loading /></div>
                            ) : (
                                <MonthlyForm
                                    monthlies={monthlies}
                                    division={division}
                                    routePath="/promotions/summary"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditPromotionMonthly