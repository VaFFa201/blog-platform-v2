/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Flex, Input } from 'antd'
import React from 'react'

import styles from './LogForm.module.scss'

const EditProfileForm = () => {
  return (
    <form className={styles.logForm}>
      <Flex vertical>
        <div className={styles.logForm__header}>Edit Profile</div>
        <label htmlFor="username">
          Username
          <Input className={styles.logForm__input} type="text" id="username" />
        </label>
        <label htmlFor="email">
          Email address
          <Input className={styles.logForm__input} type="email" id="email" />
        </label>
        <label htmlFor="password">
          New password
          <Input className={styles.logForm__input} type="password" id="password" />
        </label>
        <label htmlFor="password-rep">
          Avatar image (url)
          <Input className={styles.logForm__input} type="password" id="password-rep" />
        </label>
        <Button className={styles.logForm__btn} type="primary" size="large">
          Save
        </Button>
      </Flex>
    </form>
  )
}

export default EditProfileForm

// import  Button, Flex, Input  from 'antd'
// import React,  FC  from 'react'

// import styles from './LogForm.module.scss'

// interface EditProfileFormProps

// const EditProfileForm: FC<EditProfileFormProps> = () => {
//   return (
//     <form className=styles.logForm>
//       <Flex vertical>
//         <div className=styles.logForm__header>Edit Profile</div>
//         <label htmlFor="username">
//           Username
//           <Input className=styles.logForm__input type="text" id="username" />
//         </label>
//         <label htmlFor="email">
//           Email address
//           <Input className=styles.logForm__input type="email" id="email" />
//         </label>
//         <label htmlFor="password">
//           New password
//           <Input className=styles.logForm__input type="password" id="password" />
//         </label>
//         <label htmlFor="password-rep">
//           Avatar image (url)
//           <Input className=styles.logForm__input type="password" id="password-rep" />
//         </label>
//         <Button className=styles.logForm__btn type="primary" size="large">
//           Save
//         </Button>
//       </Flex>
//     </form>
//   )

// export default EditProfileForm
