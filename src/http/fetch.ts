export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

interface OptionsType {
  data?: any
  countRequest?: number
  timeout?: number
  isFormData?: boolean
}

type HTTPMethod = (url: string, options?: OptionsType) => Promise<any>

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
export function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

export class HTTPTransport {
  private _url: string

  private _mockRes: any = null

  constructor(url: string) {
    this._url = url
  }

  mockResolve(resp: any) {
    this._mockRes = resp
  }

  _getmockResolve() {
    return this._mockRes
  }

  mockResolveEnd() {
    this._mockRes = null
  }

  request(url: string, options: Record<string, any>, timeout = 5000) {
    if (this._mockRes !== null) {
      return new Promise((res, rej) => {
        res({ status: 200, response: JSON.stringify(this._mockRes) })
      })
    }
    return this._request(url, options, timeout)
  }

  test = (url: string, options: OptionsType) => {
    return this.request(this._url + url, { ...options, method: METHODS.GET }, options?.timeout)
  }

  get: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.GET }, options?.timeout)
  }

  post: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.POST }, options?.timeout)
  }

  put: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.PUT }, options?.timeout)
  }

  delete: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.DELETE }, options?.timeout)
  }

  _request = (url: string, options: Record<string, any>, timeout = 5000) => {
    let { headers, method, data, isFormData } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      if (typeof headers === 'object') {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key])
        })
      }
      //default headers
      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        data = JSON.stringify(data)
      }
      xhr.withCredentials = true

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(data)
        // xhr.send(body)
      }
    })
  }
}
