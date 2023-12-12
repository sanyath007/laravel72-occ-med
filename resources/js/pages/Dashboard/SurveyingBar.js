import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
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
import moment from 'moment'

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
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'สำรวจสภาพปัญหาที่ทำงาน (Walk through survey)',
        },
    },
    scales: {
        y: {
            min: 0,
            max: 10,
        }
    }
};

const months = [
    { id: 1, name: 'ม.ค.' },
    { id: 2, name: 'ก.พ.' },
    { id: 3, name: 'มี.ค.' },
    { id: 4, name: 'เม.ย.' },
    { id: 5, name: 'พ.ค.' },
    { id: 6, name: 'มิ.ย.' },
    { id: 7, name: 'ก.ค.' },
    { id: 8, name: 'ส.ค.' },
    { id: 9, name: 'ก.ย.' },
    { id: 10, name: 'ต.ค.' },
    { id: 11, name: 'พ.ย.' },
    { id: 12, name: 'ธ.ค.' },
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
    const [selectedYear, setSelectedYear] = useState(moment());

    useEffect(() => {
        getData();

        return () => getData();
    }, [selectedYear]);

    const getData = async () => {
        const res = await api.get(`/api/dashboard/${selectedYear.year()}/surveying-group-companies`);

        const series = months.map(m => {
            const data = res.data?.find(d => parseInt(d.month.substring(4), 10) === m.id);
            if (data) return data.num;

            return 0;
        });

        setBar(series);
    };

    return (
        <div className="card info-card customers-card">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <div className="w-50 d-flex me-1 justify-content-end align-items-center">
                        <span className="me-1">จากเดือน:</span>
                        <DatePicker
                            format="YYYY"
                            views={['year']}
                            value={selectedYear}
                            onChange={(date) => setSelectedYear(date)}
                        />
                    </div> - 
                    <div className="w-50 d-flex ms-1 justify-content-start align-items-center">
                        <span className="me-1">ถึงเดือน:</span>
                        <DatePicker
                            format="YYYY"
                            views={['year']}
                            value={selectedYear}
                            onChange={(date) => setSelectedYear(date)}
                        />
                    </div>
                </div>
            </div>
            <div className="card-body">
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
            </div>
        </div>
    )
}

export default SurveyingBar
