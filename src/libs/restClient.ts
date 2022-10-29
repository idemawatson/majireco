import axios, { AxiosInstance, AxiosResponse } from 'axios'

class RestClient {
  _client: AxiosInstance
  constructor() {
    this._client = axios.create({
      baseURL: 'http://localhost:3000/api',
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
  async put<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.put(path, body)
  }
}

const restClient = new RestClient()

export default restClient
