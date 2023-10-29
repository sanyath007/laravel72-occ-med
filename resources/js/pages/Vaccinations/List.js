import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVaccinations } from '../../store/slices/vaccination'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const VaccinationList = () => {
    const dispatch = useDispatch();
    const { vaccinations, pager, loading } = useSelector(state => state.vaccination);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getVaccinations({ url: `/api/vaccinations/search` }));
        } else {
            dispatch(getVaccinations({ url: `${endpoint}${params}` }));
        }
    }, [dispatch, endpoint, params]);

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
                                <h5 className="card-title p-0">รายการสร้างเสริมภูมิคุ้มกันโรค (Immunization)</h5>

                                <div>
                                    <Link to="/vaccinations/new" className="btn btn-primary">เพิ่มรายการ</Link>
                                </div>
                            </div>

                            <div>
                                <table className="table table-bordered mb-2">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th>สถานที่ให้วัคซีน</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>วันที่ฉีด</th>
                                            <th style={{ width: '15%', textAlign: 'center' }}>วัคซีน</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td className="text-center" colSpan={5}><Loading /></td>
                                            </tr>
                                        )}
                                        {vaccinations?.map((vaccination, index) => (
                                            <tr key={vaccination.id}>
                                                <td className="text-center">{pager?.from+index}</td>
                                                <td>
                                                    {vaccination.place}
                                                    <p>{vaccination.company?.name}</p>
                                                </td>
                                                <td className="text-center">
                                                    {vaccination.vaccine_date}
                                                </td>
                                                <td className="text-center">
                                                    {vaccination.vaccine?.name}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <Link to={`/vaccinations/${vaccination.id}/detail`} className="btn btn-primary btn-sm">
                                                            <i className="bi bi-search"></i>
                                                        </Link>
                                                        <Link to={`/vaccinations/${vaccination.id}/edit`} className="btn btn-warning btn-sm">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <a href="#" className="btn btn-danger btn-sm" onClick={(e) => {}}>
                                                            <i className="bi bi-trash"></i>
                                                        </a>
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

export default VaccinationList
