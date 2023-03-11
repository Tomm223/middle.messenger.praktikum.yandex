import { ChatList, DeleteChatResponse, GetChatsRequest } from '@/types/chats'
import { HTTP } from '@/http/index'
import { getBoolOfStatusCode } from './helpers/getBoolOfStatusCode'

const ChatHTTP = HTTP('/chats')

export class ChatAPI {
  constructor(mockResolve?: unknown) {
    if (mockResolve) {
      ChatHTTP.mockResolve(mockResolve)
    }
  }

  getChatById(id: number) {
    return ChatHTTP.get(`/${id}`).then((resp) => JSON.parse(resp.response))
  }

  addUser(param: { chatID: number; userID: number }) {
    const data = {
      users: [param.userID],
      chatId: param.chatID,
    }
    return ChatHTTP.put('/users', { data }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  removeUser(param: { chatID: number; userID: number }) {
    const data = {
      users: [param.userID],
      chatId: param.chatID,
    }
    return ChatHTTP.delete('/users', { data }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  createChat(title: string): Promise<boolean> {
    return ChatHTTP.post('', { data: { title } }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  removeChat(id: number): Promise<boolean | DeleteChatResponse> {
    return ChatHTTP.delete('', {
      data: {
        chatId: id,
      },
    }).then((resp) => {
      const isGood = getBoolOfStatusCode(resp.status)

      if (isGood) {
        return JSON.parse(resp.response)
      } else {
        return false
      }
    })
  }

  getChats(data: GetChatsRequest): Promise<ChatList[]> {
    if (!data.title) {
      data = { offset: data.offset, limit: data.limit }
    }
    return ChatHTTP.get('', { data }).then((resp) => JSON.parse(resp.response))
  }

  getChatToken(id: number): Promise<string | null> {
    return ChatHTTP.post(`/token/${id}`, { data: { id } })
      .then((resp) => {
        const status = getBoolOfStatusCode(resp.status)

        if (status) {
          return JSON.parse(resp.response)
        } else {
          return null
        }
      })
      .then((resp) => resp.token)
  }
}
