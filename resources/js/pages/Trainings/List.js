import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalContext } from '../../context/globalContext'
import { getTrainings, resetSuccess, destroy } from '../../store/slices/training'
import { toShortTHDate } from '../../utils/formatter'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const TrainingList = () => {
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { trainings, pager, loading, success } = useSelector(state => state.training);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    /** Initial global states */
    useEffect(() => {
        setGlobal((prev) => ({
            ...prev,
            title: 'รายการอบรมให้ความรู้',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'services', name: 'งานบริการ', path: '/services' },
                { id: 'trainings', name: 'รายการอบรมให้ความรู้', path: null, active: true }
            ]
        }))
    }, []);

    /** If delete giudeline is succeed */
    useEffect(() => {
        if (success) {
            toast.success('ลบข้อมูลเรียบร้อยแล้ว');
    
            dispatch(resetSuccess());
        }
    }, [success]);

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getTrainings({ url: '/api/trainings/search' }));
        } else {
            dispatch(getTrainings({ url: `${endpoint}${params}` }));
        }
    }, [endpoint, params]);

    const handleDelete = (id) => {
        if (confirm('คุณต้องการลบรายการใช่หรือไม่?')) {
            dispatch(destroy(id))
        }
    };

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection:'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                className="mb-2"
                            >
                                <h5 className="card-title p-0">รายการอบรมให้ความรู้</h5>

                                <div>
                                    <Link to="/trainings/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่จัดกิจกรรม</th>
                                            <th>ชื่อเอกสาร</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>ผู้ดำเนินการ</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td colSpan={5} className="text-center"><Loading /></td>
                                            </tr>
                                        )}
                                        {!loading && trainings?.map((training, index) => (
                                            <tr key={training.id}>
                                                <td className="text-center">{pager?.from+index}</td>
                                                <td className="text-center">{toShortTHDate(training.train_date)}</td>
                                                <td>
                                                    <p className="m-0"><b>หัวข้อ:</b> {training.topic}</p>
                                                    <p className="m-0"><b>สถานที่จัด:</b> {training.place}</p>
                                                    <p className="m-0">
                                                        <b>จำนวนผู้เข้าร่วม</b> {training.num_of_participants} ราย
                                                        <b className="ms-2">ผู้จัดกิจกรรม</b> {training.persons?.length} ราย
                                                    </p>
                                                </td>
                                                <td className="text-center">
                                                    {training.division?.name}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        {/* <Link to={`/trainings/${training.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link> */}
                                                        <Link to={`/trainings/${training.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(training.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <Pagination
                                    pager={pager}
                                    onPageClick={(url) => setEndpoint(url)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrainingList
