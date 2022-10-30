import useSWR from 'swr'

const useLoadingSWR = (key: string, initialData: boolean): [boolean, (state: boolean) => void] => {
  const { data: state, mutate: setState } = useSWR(key, null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as boolean, setState]
}

export const useLoading = () => {
  const [loading, setLoading] = useLoadingSWR('loading', false)

  const showLoading = () => {
    setLoading(true)
  }
  const hideLoading = () => {
    setLoading(false)
  }

  return {
    loading,
    showLoading,
    hideLoading,
    setLoading,
  }
}
