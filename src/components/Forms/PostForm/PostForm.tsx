/* eslint-disable import/order */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Flex, Input, notification } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import styles from './PostForm.module.scss'
import { useAppDispatch } from '../../../hooks/hooks.ts'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'

interface FormValues {
  title: string
  description: string
  mainСontent: string
  tag: string
}

interface Tag {
  id: number
  title: string
}

const PostForm = () => {
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const [tags, setTags] = useState<Tag[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const addTag = () => {
    const tagTitle = inputValue.trim()

    const newTag: Tag = { id: Date.now(), title: tagTitle }
    setTags([...tags, newTag])
    setInputValue('')
  }

  const removeTag = (id: number) => {
    setTags(tags.filter((i) => i.id !== id))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const tagsToRender = tags.map((tag, index) => {
    const { id, title } = tag
    const key = `${id}-${index}`

    return (
      <Flex key={key}>
        <Input value={title} className={styles.postForm__tag} disabled />
        <Button onClick={() => removeTag(id)} className={styles['postForm__tag-btn']} danger>
          Delete
        </Button>
      </Flex>
    )
  })

  const handleUpdateProfile = () => {
    notification.success({
      message: 'Successful update',
      description: 'The user profile has been successfully updated',
      placement: 'top',
      duration: 2,
    })
  }

  function isValuePresentInArray(tagsToCheck: Tag[], searchTerm: string): boolean {
    let isValuePresent = false

    for (let i = 0; i < tagsToCheck.length; i++) {
      if (tagsToCheck[i].title === searchTerm) {
        isValuePresent = true
        break
      }
    }

    return isValuePresent
  }

  // const dispatch = useAppDispatch()

  // const onSubmit = async (data: { username: string; email: string; password: string }) => {
  //   const user = {
  //     user: {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //     },
  //   }
  //   const data2 = await dispatch(register(user))

  //   if (data2) navigate('/articles')
  // }

  return (
    <form
      className={styles.postForm}
      onSubmit={() => {
        console.log('submit')
      }}
    >
      <Flex vertical>
        <div className={styles.postForm__header}>Create new article</div>
        <label htmlFor="title">
          Title
          <Controller
            name="title"
            control={control}
            rules={{
              required: 'Title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters long' },
              maxLength: { value: 60, message: 'Title is too long, try to shorten it' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.postForm__input}
                id="title"
                type="text"
                status={errors.title ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.title && <span>{errors.title.message}</span>}
        <label htmlFor="description">
          Short description
          <Controller
            name="description"
            control={control}
            rules={{
              required: 'Description is required',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.postForm__input}
                type="description"
                id="description"
                status={errors.description ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.description && <span>{errors.description.message}</span>}
        <label htmlFor="mainСontent">
          Text
          <Controller
            name="mainСontent"
            control={control}
            rules={{
              required: 'Main content is required',
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Text"
                className={styles.postForm__input}
                id="mainСontent"
                status={errors.mainСontent ? 'error' : ''}
              />
              // <Input
              //   {...field}
              //   className={styles.postForm__input}
              //   type="text"
              //   id="mainСontent"
              //   status={errors.mainСontent ? 'error' : ''}
              // />
            )}
          />
        </label>
        {errors.mainСontent && <span>{errors.mainСontent.message}</span>}
        {/* <label htmlFor="tag">
          Tags
          <Controller
            name="tag"
            control={control}
            rules={{
              minLength: { value: 1, message: 'Tag must be at least 1 characters long' },
              maxLength: { value: 35, message: 'Tag must no more than 35 characters long' },
              validate: (value) => !isValuePresentInArray(tags, value) || 'The tag must be unique in the selection',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.postForm__input}
                type="tag"
                id="tag"
                status={errors.tag ? 'error' : ''}
              />
            )}
          />
        </label> */}

        {tagsToRender}

        <Flex>
          <Controller
            name="tag"
            control={control}
            rules={{
              minLength: { value: 1, message: 'Tag must be at least 1 characters long' },
              maxLength: { value: 35, message: 'Tag must no more than 35 characters long' },
              validate: (value) => !isValuePresentInArray(tags, value) || 'The tag must be unique in the selection',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className={styles['postForm__tag-input']}
                // className={styles.postForm__input}
                value={inputValue}
                onChange={handleInput}
                // type="tag"
                id="tag"
                status={errors.tag ? 'error' : ''}
              />
            )}
          />

          {errors.tag && <span>{errors.tag.message}</span>}
          <Button className={styles['postForm__tag-addbtn']} onClick={addTag}>
            Add Tag
          </Button>
        </Flex>

        <Button type="primary" size="large" htmlType="submit" className={styles.postForm__btn}>
          Send
        </Button>
      </Flex>
    </form>
  )
}

export default PostForm
