import { Formik, Field, Form } from 'formik'
import { initialValues, validationSchema } from './config'
import './styles.scss'
import { useAppSelector } from '../../redux/hooks'
import SolarModule from '../SolarModule/SolarModule'
import { Link } from 'react-router-dom'

const SubmissionForm = () => {
  const { selectedModules } = useAppSelector((state) => state.modules)

  const totalPrice = Object.values(selectedModules).reduce(
    (acc, { price, count }) => (acc += price * count),
    0
  )

  return (
    <div className="submission-page">
      <div className="submission-page-navigation">
        <Link className="submission-page-navigation-link" to="/">
          Go back
        </Link>
      </div>
      <h1 className="submission-page-header">Submit the order</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, dirty, errors }) => (
          <Form className="submission-page-form">
            <div className="submission-page-form-pair-field">
              <div className="submission-page-form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  className="submission-page-form-field"
                />
              </div>

              <div className="submission-page-form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  className="submission-page-form-field"
                />
              </div>
            </div>

            <div className="submission-page-form-pair-field">
              <div className="submission-page-form-group">
                <label htmlFor="zipCode">ZIP code</label>
                <Field
                  id="zipCode"
                  name="zipCode"
                  placeholder="Enter your ZIP code"
                  value={values.zipCode}
                  className="submission-page-form-field"
                />
              </div>

              <div className="submission-page-form-group">
                <label htmlFor="phone">Phone number</label>
                <Field
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  className="submission-page-form-field"
                />
              </div>
            </div>

            <div className="submission-page-form-group">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={values.email}
                className="submission-page-form-field"
              />
            </div>

            <div className="submission-page-form-pair-field">
              <span className="submission-page-form-total-price">
                Total Price: {totalPrice}
              </span>
              <button
                type="submit"
                disabled={
                  !dirty ||
                  !!Object.keys(errors).length ||
                  !Object.keys(selectedModules).length
                }
                className="submission-page-form-submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {Object.entries(selectedModules).map(([name, props], i) => (
        <SolarModule key={i} name={name} {...props} />
      ))}
    </div>
  )
}

export default SubmissionForm
