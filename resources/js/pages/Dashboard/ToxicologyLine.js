import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { faker } from '@faker-js/faker'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
            text: 'งานพิษวิทยาและเวชศาสตร์สิ่งแวดล้อม',
        },
    },
};

const labels = ['ต.ค.','พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

export const data = {
    labels,
    datasets: [
        {
            label: 'จำนวนการสอบสวนโรคจากสิ่งแวดล้อม',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        // {
        //     label: 'Dataset 2',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
    ],
};

const ToxicologyLine = () => {
    return (
        <Line options={options} data={data} />
    )
}

export default ToxicologyLine
