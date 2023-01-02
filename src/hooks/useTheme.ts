import useSWR from 'swr'

const useThemeSWR = (key: string, initialData: string): [string, (state: string) => void] => {
  const { data: state, mutate: setState } = useSWR(key, null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as string, setState]
}

export const useTheme = () => {
  const [theme, setTheme] = useThemeSWR('theme', '')

  return {
    theme,
    setTheme,
  }
}
