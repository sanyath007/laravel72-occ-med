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
            text: 'สำรวจสภาพปัญหาที่ทำงาน (Walk through survey)',
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

// const labels = ['ต.ค.','พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

// const data = {
//     labels,
//     datasets: [
//         {
//             label: 'จำนวนสถานประกอบกิจการ/ สถานที่',
//             data: bar,
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
        // {
        //     label: 'Dataset 2',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
//     ],
// };

const SurveyingBar = () => {
    const [bar, setBar] = useState([]);

    useEffect(() => {
        getData();

        return () => getData();
    }, []);

    const getData = async () => {
        const res = await api.get(`/api/dashboard/2566/surveying-group-companies`);

        const series = months.map(m => {
            const data = res.data?.find(d => parseInt(d.month.substring(4), 10) === m.id);
            if (data) return data.num;

            return 0;
        });

        setBar(series);
    };

    return (
        <Bar
            options={options}
            data={{
                labels: months.map(month => month.name),
                datasets: [
                    {
                        label: 'จำนวนสถานประกอบกิจการ/ สถานที่',
                        data: bar,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            }}
        />
    )
}

export default SurveyingBar
