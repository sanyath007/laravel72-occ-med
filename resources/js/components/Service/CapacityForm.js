import React from 'react'
import RadioGroup from '../Forms/RadioGroup';

const Capacity = ({ formProps }) => {
    return (
        <div className="row mb-2">
            <div className="col-md-12 mb-2" id="screening_capacity">
                <div className="row">
                    <div className="col-md-3">
                        <RadioGroup
                            label="สมรรถนะการมองเห็น"
                            name="vision"
                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                            onSelected={({ name, value }) => {
                                console.log(name, value);
                                formProps.setFieldValue(name, value)
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <RadioGroup
                            label="สมรรถนะการได้ยิน"
                            name="hearing"
                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                            onSelected={({ name, value }) => {
                                console.log(name, value);
                                formProps.setFieldValue(name, value)
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <RadioGroup
                            label="สมรรถนะปอด"
                            name="lung"
                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                            onSelected={({ name, value }) => {
                                console.log(name, value);
                                formProps.setFieldValue(name, value)
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <RadioGroup
                            label="สมรรถนะร่างกาย"
                            name="body"
                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                            onSelected={({ name, value }) => {
                                console.log(name, value);
                                formProps.setFieldValue(name, value)
                            }}
                        />
                    </div>
                    <div className="col-md-3">
                        <RadioGroup
                            label="สมรรถนะคลื่นไฟฟ้าหัวใจ"
                            name="heart_wave"
                            items={[{id: 1, name: 'ปกติ'}, {id: 2, name: 'เสี่ยง'}, {id: 3, name: 'ผิดปกติ'}]}
                            onSelected={({ name, value }) => {
                                console.log(name, value);
                                formProps.setFieldValue(name, value)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Capacity
