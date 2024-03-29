import axios, { AxiosInstance, AxiosResponse } from 'axios'

class RestClient {
  _client: AxiosInstance
  constructor() {
    this._client = axios.create({
      baseURL: `${process.env['NEXT_PUBLIC_API_URL']}/api`,
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
  async get<T>(path: string): Promise<AxiosResponse<T>> {
    return await this._client.get(path)
  }
  async post<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.post(path, body)
  }
  async patch<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.patch(path, body)
  }
  async put<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.put(path, body)
  }
  async delete<T, U>(path: string): Promise<AxiosResponse<U>> {
    return await this._client.delete(path)
  }
}

const restClient = new RestClient()

export default restClient
