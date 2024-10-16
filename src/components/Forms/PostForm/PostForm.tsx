/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { Button, Flex, Input, Spin, notification } from 'antd'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'

import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks.ts'
import {
  clearCurrentArticle,
  fetchArticleData,
  fetchData,
  postNewArticle,
  updateArticle,
} from '../../../app/Redux/actions/fetchDataActions.ts'
import { RootState } from '../../../app/Redux/stores/store.ts'

import styles from './PostForm.module.scss'

interface FormValues {
  title: string
  description: string
  body: string
  tags: { title: string }[]
}

type PostViewParams = {
  sign: any
}

const PostForm = () => {
  const { sign } = useParams<PostViewParams>()
  const dispatch = useAppDispatch()
  const currentArticle = useAppSelector((state: RootState) => state.posts.currentArticle)
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const location = useLocation()
  const navigate = useNavigate()

  const pathIncludesEdit = location.pathname.includes('/edit')

  const {
    getValues,
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues:
      pathIncludesEdit && currentArticle
        ? {
            title: currentArticle.title,
            description: currentArticle.description,
            body: currentArticle.body,
            tags: currentArticle.tagList.forEach((tag: string) => ({ title: tag })),
          }
        : { title: '', description: '', body: '', tags: [] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  useEffect(() => {
    if (pathIncludesEdit) {
      dispatch(fetchArticleData(sign, isAuthenticated))

      currentArticle?.tagList.forEach((tag: string) => {
        const tagToField = { title: tag }
        append(tagToField)
      })

      return () => {
        dispatch(clearCurrentArticle())
      }
    }
    reset({ title: '', description: '', body: '', tags: [] })
  }, [pathIncludesEdit])

  const [inputValue, setInputValue] = useState<string>('')

  if (!currentArticle && pathIncludesEdit)
    return (
      <Flex style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spin />
      </Flex>
    )

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

    if (pathIncludesEdit) {
      const data2 = await dispatch(updateArticle(article, currentArticle.slug))

      if (data2) handlePostArticle()
    } else {
      const data2 = await dispatch(postNewArticle(article))

      if (data2) handlePostArticle()
    }

    dispatch(fetchData(isAuthenticated))
    navigate('/articles')
  }

  const tagsToRender = fields?.map((tag, index) => {
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

  return (
    <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical>
        <div className={styles.postForm__header}> {pathIncludesEdit ? 'Update article' : 'Create new article'}</div>
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
        {errors.title && <span className={styles.postForm__warning}>{errors.title.message}</span>}

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
        {errors.description && <span className={styles.postForm__warning}>{errors.description.message}</span>}

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
        {errors.body && <span className={styles.postForm__warning}>{errors.body.message}</span>}

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
          {errors.tags && <span className={styles.postForm__warning}>{errors.tags.message}</span>}
        </label>

        <Button type="primary" size="large" htmlType="submit" className={styles.postForm__btn}>
          {pathIncludesEdit ? 'Update' : 'Send'}
        </Button>
      </Flex>
    </form>
  )
}

export default PostForm
