import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthContext from '../context/authContext';
import { GlobalContext } from '../context/globalContext';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { increment, decrement } from '../store/counter'

const About = () => {
    const { authData } = useContext(AuthContext)
    const { setGlobal } = useContext(GlobalContext)
    const dispatch = useDispatch()
    const count = useSelector(state => state.counter.value)

    useEffect(() => {
        console.log('on About...', authData);

        setGlobal((prev) => ({
            ...prev,
            title: 'เกี่ยวกับเรา (About)',
            breadcrumbs: [
                { id: 'home', name: 'Home', path: '/' },
                { id: 'about', name: 'เกี่ยวกับเรา (About)', path: null, active: true }
            ]
        }))
    }, [])

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">เกี่ยวกับเรา (About)</h5>
                            <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '20px' }}>
                                <AiFillMinusCircle onClick={() => dispatch(decrement())} role="button" />
                                <span className="px-4 mx-1 rounded" style={{ backgroundColor: '#dddddd' }}>
                                    {count}
                                </span>
                                <AiFillPlusCircle onClick={() => dispatch(increment())} role="button" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About