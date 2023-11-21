import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { faker } from '@faker-js/faker'
import api from '../../api'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
    //     legend: {
    //         position: 'top'
    //     },
        title: {
            display: true,
            text: 'จำนวนการสอบสวนโรค',
        },
    },
};

const months = [
    { id: 10, name: 'ต.ค.' },
    { id: 11, name: 'พ.ย.' },
    { id: 12, name: 'ธ.ค.' },
    { id: 1, name: 'ม.ค.' },
    { id: 2, name: 'ก.พ.' },
    { id: 3, name: 'มี.ค.' },
    { id: 4, name: 'เม.ย.' },
    { id: 5, name: 'พ.ค.' },
    { id: 6, name: 'มิ.ย.' },
    { id: 7, name: 'ก.ค.' },
    { id: 8, name: 'ส.ค.' },
    { id: 9, name: 'ก.ย.' }
];

const BGCOLOR = ['rgba(255, 99, 132, 0.5)','rgba(53, 162, 235, 0.5)','rgba(255, 205, 86, 0.5)']

const InvestigationBar = () => {
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        getData();

        return () => getData();
    }, []);

    const getData = async () => {
        const res = await api.get(`/api/dashboard/2566/invest-by-divisions`);

        const ds = Object.keys(res.data).map((set, index) => {
            return {
                label: set,
                data: months.map(m => {
                    const data = res.data[set]?.find(d => parseInt(d.month.substring(4), 10) === m.id);
                    if (data) return data.num;
        
                    return 0;
                }),
                backgroundColor: BGCOLOR[index],
            };
        });

        setDatasets(ds);
    };

    return (
        <Bar
            options={options}
            data={{
                labels: months.map(month => month.name),
                datasets: datasets,
            }}
        />
    )
}

export default InvestigationBar
