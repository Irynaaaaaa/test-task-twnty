import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  email: Yup.string().required().label('Email'),
  phone: Yup.string().min(10).max(10).required().label('Phone number'),
  zipCode: Yup.string()
    .test('length', 'Must contain 5 characters', (val) => val?.length === 5)
    .required()
    .label('ZIP code'),
})

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zipCode: '',
}
