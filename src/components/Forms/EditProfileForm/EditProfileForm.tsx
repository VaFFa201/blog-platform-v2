/* eslint-disable import/order */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Flex, Input, notification } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import styles from './LogForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks.ts'
import { RootState } from '../../../stores/store.ts'
import { updateUser } from '../../../actions/authActions.ts'

interface FormValues {
  username: string
  email: string
  newPassword: string
  image: string
}

const EditProfileForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.auth.user)

  const handleUpdateProfile = () => {
    notification.success({
      message: 'Successful update',
      description: 'The user profile has been successfully updated',
      placement: 'top',
      duration: 2,
    })
  }

  const onSubmit = async (data: FormValues) => {
    const userToUpdate = {
      user: {
        username: data.username,
        email: data.email,
        password: data.newPassword,
        bio: user.bio,
        image: data.image,
      },
    }

    const data2 = await dispatch(updateUser(userToUpdate))

    if (data2) handleUpdateProfile()
  }

  return (
    <form className={styles.logForm} onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        <div className={styles.logForm__header}>Edit profile</div>
        <label htmlFor="username">
          Username
          <Controller
            name="username"
            control={control}
            defaultValue={user.username}
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
        {errors.username && <span className={styles.logForm__warning}>{errors.username.message}</span>}
        <label htmlFor="email">
          Email address
          <Controller
            name="email"
            control={control}
            defaultValue={user.email}
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
        {errors.email && <span className={styles.logForm__warning}>{errors.email.message}</span>}
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
        {errors.newPassword && <span className={styles.logForm__warning}>{errors.newPassword.message}</span>}

        <label htmlFor="image">
          Avatar image (url)
          <Controller
            name="image"
            control={control}
            defaultValue={user.image}
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
        {errors.image && <span className={styles.logForm__warning}>{errors.image.message}</span>}
        <Button type="primary" size="large" htmlType="submit" className={styles.logForm__btn}>
          Save
        </Button>
      </Flex>
    </form>
  )
}

export default EditProfileForm
