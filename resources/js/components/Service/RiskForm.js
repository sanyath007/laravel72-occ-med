import React from 'react'
import RadioGroup from '../Forms/RadioGroup';

const RiskForm = ({ formProps }) => {
    return (
        <div className="row mb-2">
            <div className="row">
                <div className="col-md-4">
                    <RadioGroup
                        label="สูบบุหรี่"
                        name=" smoking"
                        items={[
                            {id: 1, name: 'ไม่สูบ'},
                            {id: 2, name: 'เคยสูบ แต่เลิกแล้ว'},
                            {id: 3, name: 'สูบวันละมากกว่า ม้วน'}
                        ]}
                        onSelected={({ name, value }) => {
                            console.log(name, value);
                            formProps.setFieldValue(name, value)
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <RadioGroup
                        label="ดื่มแอลกอฮอล์"
                        name="drinking"
                        items={[
                            {id: 1, name: 'ไม่ดื่ม'},
                            {id: 2, name: 'เคยดื่ม แต่เลิกแล้ว'},
                            {id: 3, name: 'ดื่มเดือนละมากกว่า ครั้ง'}
                        ]}
                        onSelected={({ name, value }) => {
                            console.log(name, value);
                            formProps.setFieldValue(name, value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default RiskForm
