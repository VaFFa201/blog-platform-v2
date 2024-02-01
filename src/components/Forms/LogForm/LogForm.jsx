/* eslint-disable import/order */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Checkbox, Flex, Input } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { LOGIN_ROUTE } from '../../../utils/consts.ts'

import styles from './LogForm.module.scss'

const LogForm = () => {
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form className={styles.logForm} onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        <div className={styles.logForm__header}>Create new account</div>
        <label htmlFor="username">
          Username
          <Controller
            name="username"
            id="username"
            control={control}
            className={styles.logForm__input}
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters long' },
              maxLength: { value: 20, message: 'Username must be no longer then 20 characters' },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
        {errors.username && <span>{errors.username.message}</span>}
        <label htmlFor="email">
          Email address
          <Controller
            className={styles.logForm__input}
            type="email"
            name="email"
            id="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="password">
          Password
          <Controller
            className={styles.logForm__input}
            type="password"
            name="password"
            id="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              maxLength: { value: 40, message: 'Password must be no longer then 40 characters' },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}
        <label htmlFor="password-rep">
          Repeat Password
          <Controller
            className={styles.logForm__input}
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            control={control}
            rules={{
              required: 'Repeat Password is required',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            }}
            render={({ field }) => <Input {...field} />}
          />
        </label>
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
        <Controller
          className={styles.logForm__checkbox}
          name="agree"
          defaultValue={false}
          control={control}
          rules={{
            required: 'It is necessary to accept the term',
          }}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
        I agree to the processing of my personal information
        {errors.agree && <p>{errors.agree.message}</p>}
        <Button type="primary" size="large" htmlType="submit" className={styles.logForm__btn}>
          Create
        </Button>
        <div className="logForm__footnote">
          Already have an account? <NavLink to={LOGIN_ROUTE}>Sign In</NavLink>.
        </div>
      </Flex>
    </form>
  )
}

export default LogForm

// import  Button, Checkbox, Flex, Input  from 'antd'
// import React,  FC  from 'react'
// import  NavLink  from 'react-router-dom'
// import  useForm, Controller  from 'react-hook-form'

// import  LOGIN_ROUTE  from '../../../utils/consts'

// import styles from './LogForm.module.scss'
// import { type } from './../../../stores/store'

// interface LogFormProps

// interface FormData {
//   username: string
//   email: string
//   password: string
//   repeatPassword: string
//   agree: boolean

// const LogForm: FC<LogFormProps> = () => {
//   const  control, handleSubmit, errors, watch  = useForm<FormData>()

//   const onSubmit = (data: FormData) => {
//     console.log(data)
//   }

//   const password = watch('password')

//   return (
//     <form className=styles.logForm onSubmit=handleSubmit(onSubmit)>
//       <Flex vertical>
//         <div className=styles.logForm__header>Create new account</div>
//         <label htmlFor="username">
//           Username
//           <Controller
//             as=<Input className=styles.logForm__input type="text" />
//             name="username"
//             control=control
//             rules= required: true, minLength: 3, maxLength: 20
//           />
//         </label>
//         errors.username?.type === 'required' && <p>Username is required</p>
//         errors.username?.type === 'minLength' && <p>Username must be at least 3 characters long</p>
//         errors.username?.type === 'maxLength' && <p>Username must be at most 20 characters long</p>

//         <label htmlFor="email">
//           Email address
//           <Controller
//             as=<Input className=styles.logForm__input type="email" />
//             name="email"
//             control=control
//             rules= required: true, pattern: /^+@+/i
//           />
//         </label>
//         errors.email?.type === 'required' && <p>Email is required</p>errors.email?.type === 'pattern' && <p>Invalid email address</p>

//         <label htmlFor="password">
//           Password
//           <Controller
//             as=<Input className=styles.logForm__input type="password" />
//             name="password"
//             control=control
//             rules= required: true, minLength: 6, maxLength: 40
//           />
//         </label>
//         errors.password?.type === 'required' && <p>Password is required</p>errors.password?.type === 'minLength' && <p>Password must be at least 6 characters long</p>errors.password?.type === 'maxLength' && <p>Password must be at most 40 characters long</p>

//         <label htmlFor="repeatPassword">
//           Repeat Password
//           <Controller
//             as=<Input className=styles.logForm__input type="password" />
//             name="repeatPassword"
//             control=control
//             rules=
//               required: true,
//               validate: (value) => value === password,

//           />
//         </label>
//         errors.repeatPassword?.type === 'required' && <p>Repeat Password is required</p>errors.repeatPassword?.type === 'validate' && <p>Passwords do not match</p>

//         <Controller
//           as=<Checkbox className=styles.logForm__checkbox>I agree to the processing of my personal information</Checkbox>
//           name="agree"
//           control=control
//           rules= required: true
//         />
//         errors.agree?.type === 'required' && <p>You must agree to the terms and conditions</p>
//         <Button className=styles.logForm__btn type="primary" size="large" htmlType="submit">
//           Create
//         </Button>
//         <div className="logForm__footnote">
//           Already have an account? <NavLink to=LOGIN_ROUTE>Sign In</NavLink>.
//         </div>
//       </Flex>
//     </form>
//   )

// export default LogForm
