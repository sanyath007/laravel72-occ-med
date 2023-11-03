import React from 'react'
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
            text: 'สำรวจสภาพปัญหาที่ทำงาน (Walk through survey)',
        },
    },
};

const labels = ['ต.ค.','พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

export const data = {
    labels,
    datasets: [
        {
            label: 'จำนวนสถานประกอบกิจการ/ สถานที่',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        // {
        //     label: 'Dataset 2',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
    ],
};

const SurveyingBar = () => {
    return (
        <Bar options={options} data={data} />
    )
}

export default SurveyingBar
