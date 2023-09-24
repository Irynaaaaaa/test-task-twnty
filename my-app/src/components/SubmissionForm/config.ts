import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  email: Yup.string().required().label('Email'),
  phone: Yup.string().required().label('Phone number'),
  zipCode: Yup.number().required().label('Zip code'),
})

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zipCode: '',
}
