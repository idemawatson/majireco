import dayjs from 'dayjs'
import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { GetAggregatedRecordsResponseDTO } from '@/usecases/GetAggregatedRecords.ts/GetAggregatedRecordsDto'

export const useAnalyzedRecords = (rate: string) => {
  const fetcher = async (url: string): Promise<GetAggregatedRecordsResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as GetAggregatedRecordsResponseDTO
  }
  let query = `record`
  const from = dayjs().add(-1, 'year').format('YYYYMMDD')
  const to = dayjs().format('YYYYMMDD')
  if (rate) query = `${query}?rate=${rate}&from=${from}&to=${to}`
  const { data, mutate } = useSWR(query, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
