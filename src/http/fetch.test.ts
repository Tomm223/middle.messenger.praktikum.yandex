import { HTTPTransport } from './fetch'

describe('HTTPTransport', () => {
  const http = new HTTPTransport('https://jsonplaceholder.typicode.com')
  const mockRes = { tree: { a: null, b: null } }
  test('mocking', async () => {
    http.mockResolve(mockRes)
    return http
      .get('/posts')
      .then((data) => JSON.parse(data.response))
      .then((data) => {
        expect(data).toEqual(mockRes)
        http.mockResolveEnd()
      })
  })

  test('request: get options create url query', async () => {
    const respCheck = JSON.stringify([
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ])

    // return http.get('/posts', { data: { id: 1 } }).then((data) => {
    //   expect(data.response).toEqual(respCheck)
    // })
    // .then((data) => {
    //   expect(data).toEqual(respCheck)
    // })
  })
})
