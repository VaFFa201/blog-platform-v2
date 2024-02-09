/* eslint-disable import/order */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Checkbox, Flex, Input } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { LOGIN_ROUTE } from '../../../utils/consts.ts'

import styles from './LogForm.module.scss'
import { useAppDispatch } from '../../../hooks/hooks.ts'
import { register } from '../../../actions/authActions.ts'

interface FormValues {
  username: string
  email: string
  password: string
  repeatPassword: string
  agree: boolean
}

const LogForm = () => {
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data: { username: string; email: string; password: string }) => {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }
    const data2 = await dispatch(register(user))

    if (data2) navigate('/articles')
  }

  return (
    <form className={styles.logForm} onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        <div className={styles.logForm__header}>Create new account</div>
        <label htmlFor="username">
          Username
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters long' },
              maxLength: { value: 20, message: 'Username must be no longer then 20 characters' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.logForm__input}
                id="username"
                status={errors.username ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.username && <span>{errors.username.message}</span>}
        <label htmlFor="email">
          Email address
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.logForm__input}
                type="email"
                id="email"
                status={errors.email ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="password">
          Password
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              maxLength: { value: 40, message: 'Password must be no longer then 40 characters' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.logForm__input}
                type="password"
                id="password"
                status={errors.password ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}
        <label htmlFor="password-rep">
          Repeat Password
          <Controller
            name="repeatPassword"
            control={control}
            rules={{
              required: 'Repeat Password is required',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.logForm__input}
                type="password"
                id="repeatPassword"
                status={errors.repeatPassword ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
        <Controller
          name="agree"
          defaultValue={false}
          control={control}
          rules={{
            required: 'It is necessary to accept the term',
          }}
          render={({ field }) => <Checkbox {...field} className={styles.logForm__checkbox} checked={field.value} />}
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
