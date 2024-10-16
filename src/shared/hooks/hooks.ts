import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../../app/Redux/stores/store.ts'

export function useNavigatorOnline() {
  const [value, setValue] = useState(window.navigator.onLine)

  useEffect(() => {
    function handleOnlineStatus() {
      setValue(window.navigator.onLine)
    }

    window.addEventListener('online', handleOnlineStatus)
    window.addEventListener('offline', handleOnlineStatus)

    return () => {
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
    }
  }, [])

  return { isOnline: value, isOffline: !value }
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
