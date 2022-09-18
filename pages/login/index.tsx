import {useFormik} from 'formik'
import * as Yup from 'yup'

import {useDispatch, useSelector} from 'store'

import {login} from 'redux/login/login.slice'

const Login = () => {
  const dispatch = useDispatch()
  const {loading} = useSelector((state) => state.login)

  const formik = useFormik<{email: string; password: string}>({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().min(8).required('Password is required')
    }),
    onSubmit: (values) => {
      dispatch(
        login({
          email: values.email,
          password: values.password,
          onSuccess: () => false
        })
      )
    }
  })

  return (
    <div>
      <h3>Login</h3>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div style={{color: 'red', fontSize: 12}}>
            {formik.touched.email && formik.errors.email}
          </div>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div style={{color: 'red', fontSize: 12}}>
            {formik.touched.password && formik.errors.password}
          </div>
        </div>

        {loading ? (
          <span>Loading...</span>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </div>
  )
}

export default Login
