/* eslint-disable import/order */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Flex, Input, notification } from 'antd'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import styles from './PostForm.module.scss'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { useAppDispatch } from '../../../hooks/hooks.ts'
import { postNewArticle } from '../../../actions/fetchDataActions.ts'

interface FormValues {
  title: string
  description: string
  body: string
  tags: { title: string }[]
}

const PostForm = () => {
  const {
    getValues,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addTag = () => {
    const inputLength = inputValue.length
    const tagNames = getValues('tags')?.map((tag) => tag.title)
    const isTagNameNotUnique = tagNames.some((tag) => tag === inputValue)

    if (inputLength < 1) {
      setError('tags', { type: 'minLength', message: 'Tag must be at least 1 characters long' })
    } else if (inputLength > 35) {
      setError('tags', { type: 'maxLength', message: 'Tag must no more than 35 characters long' })
    } else if (isTagNameNotUnique) {
      setError('tags', { type: 'unique', message: 'Tag must be unique' })
    } else {
      clearErrors('tags')
      append({ title: inputValue })
      setInputValue('')
    }
  }

  const tagsToRender = fields.map((tag, index) => {
    const { title } = tag
    const key = `${title}-${index}`

    return (
      <Flex key={key}>
        <Input value={title} className={styles.postForm__tag} disabled />
        <Button onClick={() => remove(index)} className={styles['postForm__tag-btn']} danger>
          Delete
        </Button>
      </Flex>
    )
  })

  const handlePostArticle = () => {
    notification.success({
      message: 'Successful posting',
      description: 'Your post has already been posted, you can view it by selecting on the main page',
      placement: 'top',
      duration: 2,
    })
  }

  const onSubmit = async (data: { title: string; description: string; body: string; tags: { title: string }[] }) => {
    const article = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tags.map((tag) => tag.title),
      },
    }

    const data2 = await dispatch(postNewArticle(article))

    if (data2) handlePostArticle()
  }

  return (
    <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="body">
          Text
          <Controller
            name="body"
            control={control}
            rules={{
              required: 'Main content is required',
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Text"
                className={styles.postForm__input}
                id="body"
                status={errors.body ? 'error' : ''}
              />
            )}
          />
        </label>
        {errors.body && <span>{errors.body.message}</span>}

        <label htmlFor="tags">
          Tags
          {tagsToRender}
          <Flex>
            <Controller
              name="tags"
              control={control}
              rules={{
                minLength: { value: 1, message: 'Tag must be at least 1 characters long' },
                maxLength: { value: 35, message: 'Tag must no more than 35 characters long' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className={styles['postForm__tag-input']}
                  value={inputValue}
                  onChange={handleInput}
                  id="tags"
                  status={errors.tags ? 'error' : ''}
                />
              )}
            />
            <Button className={styles['postForm__tag-addbtn']} onClick={addTag}>
              Add Tag
            </Button>
          </Flex>
          {errors.tags && <span>{errors.tags.message}</span>}
        </label>

        <Button type="primary" size="large" htmlType="submit" className={styles.postForm__btn}>
          Send
        </Button>
      </Flex>
    </form>
  )
}

export default PostForm
