import { ChatList, DeleteChatResponse } from '@/types/chats'
import { ChatsController } from '@/service/chats.service'
import Store from '@/store/index'
import Actions from '@/store/Actions'

describe('ChatsController', () => {
  let list: ChatList[]
  beforeEach(() => {
    // Actions.resetStore()
    list = [
      { avatar: null, id: 1, title: 'One', unread_count: 0, last_message: null },
      { avatar: null, id: 2, title: 'Two', unread_count: 0, last_message: null },
    ]
  })

  test('getNewChatList', async () => {
    const controller = new ChatsController(list)
    await controller.getNewChatList({ limit: 0, offset: 0, title: '' })

    const chatList = Actions.getChatList()

    expect(chatList).toEqual(list)
  })
  test('createChat', async () => {
    const controller = new ChatsController(list)
    await controller.createChat('Tree')

    const chatList = Actions.getChatList()

    expect(chatList).toEqual(list)
  })
  test('removeChat', async () => {
    const deleteResp: DeleteChatResponse = {
      result: { id: 1, title: '3', avatar: null, created_by: 2 },
      userId: 1,
    }
    const controller = new ChatsController(deleteResp)
    await controller.removeChat(3)

    const chatList = Actions.getChatList()

    expect(chatList).toEqual(deleteResp)
  })

  test('pushNewChats', async () => {
    Actions.setChatList(list)

    const controller = new ChatsController(list)
    await controller.pushNewChats({ limit: 0, offset: 0, title: '' })

    const chatList = Actions.getChatList()

    expect(chatList).toEqual([...list, ...list])
  })

  test('pushNewChats: response=[]', async () => {
    Actions.setChatList(list)

    const controller = new ChatsController([])
    await controller.pushNewChats({ limit: 0, offset: 0, title: '' })

    const chatList = Actions.getChatList()
    const isAll = Store.getState().listChats.isAll

    expect(chatList).toEqual(list)
    expect(isAll).toEqual(true)
  })
})
