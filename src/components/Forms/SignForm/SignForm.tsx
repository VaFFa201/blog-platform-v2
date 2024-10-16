/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Button, Flex, Input } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { REGISTRATION_ROUTE } from '../../../shared/utils/consts.ts'
import { useAppDispatch } from '../../../shared/hooks/hooks.ts'
import { login } from '../../../app/Redux/actions/authActions.ts'

import styles from './SignForm.module.scss'

type FormValues = {
  email: string
  password: string
}

const SignForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: { email: string; password: string }) => {
    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    }
    const data2 = await dispatch(login(user))

    if (data2) navigate('/articles')
  }

  return (
    <form className={styles.signForm} onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        <div className={styles.signForm__header}>Sign In</div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          }}
          render={({ field }) => (
            <label htmlFor="email">
              Email address
              <Input
                {...field}
                className={styles.signForm__input}
                type="email"
                id="email"
                status={errors.email ? 'error' : ''}
              />
            </label>
          )}
        />
        {errors.email && <span className={styles.signForm__warning}>{errors.email.message}</span>}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password must be at least 8 characters long',
            },
          }}
          render={({ field }) => (
            <label htmlFor="password">
              Password
              <Input
                {...field}
                className={styles.signForm__input}
                type="password"
                id="password"
                status={errors.password ? 'error' : ''}
              />
            </label>
          )}
        />
        {errors.password && <span className={styles.signForm__warning}>{errors.password.message}</span>}
        <Button className={styles.signForm__btn} type="primary" size="large" htmlType="submit">
          Sign In
        </Button>
        <div className="logForm__footnote">
          Don’t have an account? <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink>.
        </div>
      </Flex>
    </form>
  )
}

export default SignForm
