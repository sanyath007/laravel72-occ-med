import React, { useEffect, useState } from 'react'

const PatientFilter = ({ setQueryStrings }) => {
    const [filterings, setFilterings] = useState({ hn: '', name: '' })

    useEffect(() => {
        generateQueryString()
    }, [filterings])

    const generateQueryString = () => {
        /** TODO: Filtering logic */
        const hn = filterings.hn ? filterings.hn : ''
        const [fname, lname] = filterings.name ? filterings.name.split(' ') : ' '.split(' ')

        setQueryStrings(`&hn=${hn}&name=${fname}-${lname == undefined ? '' : lname}`)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFilterings(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div className="d-flex gap-3">
            <input
                type="text"
                name="hn"
                value={filterings.hn}
                onChange={handleChange}
                className="form-control"
                placeholder="ค้นหาด้วย HN"
            />
            <input
                type="text"
                name="name"
                value={filterings.name}
                onChange={handleChange}
                className="form-control"
                placeholder="ค้นหาด้วยชื่อ สกุล"
            />
        </div>
    )
}

export default PatientFilter
