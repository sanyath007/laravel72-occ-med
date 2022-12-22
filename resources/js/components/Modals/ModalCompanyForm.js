import React from 'react'
import { Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const companySchema = Yup.object().shape({

})

const ModalCompanyForm = ({ isOpen, hideModal }) => {
    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
        >
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{

                    }}
                    validationSchema={companySchema}
                    onSubmit={(values) => console.log(values)}
                >
                    {(formProps) => (
                        <Form>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default ModalCompanyForm
