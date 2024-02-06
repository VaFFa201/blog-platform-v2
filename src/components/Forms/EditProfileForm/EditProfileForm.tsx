/* eslint-disable import/order */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Checkbox, Flex, Input } from 'antd'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { LOGIN_ROUTE } from '../../../utils/consts.ts'

import styles from './LogForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.ts'
import { RootState } from '../../../stores/store.ts'

interface FormValues {
  username: string
  email: string
  newPassword: string
  image: string
}

const EditProfileForm = () => {
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state: RootState) => state.auth.user)

  const onSubmit = async (data: FormValues) => {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.newPassword,
        image: data.image,
      },
    }
    console.log(user)

    // if (data2) navigate('/articles')
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
                defaultValue={user.username}
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
                defaultValue={user.email}
                status={errors.email ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="newPassword">
          New password
          <Controller
            name="newPassword"
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
                id="newPassword"
                status={errors.newPassword ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.newPassword && <span>{errors.newPassword.message}</span>}

        <label htmlFor="image">
          Avatar image (url)
          <Controller
            name="image"
            control={control}
            rules={{
              required: 'URL is required',
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'Invalid URL format',
              },
            }}
            render={({ field }) => (
              <Input {...field} className={styles.logForm__input} id="image" status={errors.image ? 'error' : ''} />
            )}
          />
        </label>
        {errors.image && <span>{errors.image.message}</span>}
        <Button type="primary" size="large" htmlType="submit" className={styles.logForm__btn}>
          Save
        </Button>
      </Flex>
    </form>
  )
}

export default EditProfileForm

// import { Button, Flex, Input } from 'antd'
// import React from 'react'

// import styles from './LogForm.module.scss'

// const EditProfileForm = () => {
//   return (
//     <form className={styles.logForm}>
//       <Flex vertical>
//         <div className={styles.logForm__header}>Edit Profile</div>
//         <label htmlFor="username">
//           Username
//           <Input className={styles.logForm__input} type="text" id="username" />
//         </label>
//         <label htmlFor="email">
//           Email address
//           <Input className={styles.logForm__input} type="email" id="email" />
//         </label>
//         <label htmlFor="password">
//           New password
//           <Input className={styles.logForm__input} type="password" id="password" />
//         </label>
//         <label htmlFor="password-rep">
//           Avatar image (url)
//           <Input className={styles.logForm__input} type="password" id="password-rep" />
//         </label>
//         <Button className={styles.logForm__btn} type="primary" size="large">
//           Save
//         </Button>
//       </Flex>
//     </form>
//   )
// }

// export default EditProfileForm
