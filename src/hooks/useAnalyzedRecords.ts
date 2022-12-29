import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { GetAggregatedRecordsResponseDTO } from '@/usecases/GetAggregatedRecords.ts/GetAggregatedRecordsDto'

export const useAnalyzedRecords = (rate: string) => {
  const fetcher = async (url: string): Promise<GetAggregatedRecordsResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as GetAggregatedRecordsResponseDTO
  }
  let query = `record`
  if (rate) query = `${query}?rate=${rate}&from=${202211}&to=${202212}`
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
