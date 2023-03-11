import { ChatsController } from '@/service/chats.service'
import { ChatList } from '@/types/chats'
import Store from '../Store'

const store = new Store()

type ActionGetList = () => ChatList[] | []

const getChatListOffset = () => {
  return store.getState().listChats.list.length + 1
}

const setChatListLimit = (limit: number) => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, limit })
}

const pushNewItemsChat = async () => {
  const api = new ChatsController()

  const { limit, search } = store.getState().listChats
  const offset = getChatListOffset()
  await api.pushNewChats({
    limit,
    offset,
    title: search,
  })
}

const startChatListLoading = () => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, loading: true })
}

const getChatList: ActionGetList = () => {
  const list = store.getState().listChats.list

  return list
}
const getChatListLimit = () => {
  return store.getState().listChats.limit
}

const getChatListSearch = () => {
  return store.getState().listChats.search
}

const getFilterChatList: ActionGetList = () => {
  const string = getChatListSearch()
  const list = getChatList()

  // if (!list.length) {
  //   return []
  // }
  if (string === '') {
    return list
  }
  if (list.length) {
    const resp = list as ChatList[]
    return resp.filter((item) => item.title.toLowerCase().includes(string.toLowerCase()))
  } else {
    return list
  }
}

const setIsAllChatList = (bool: boolean) => {
  const oldListState = store.getState().listChats

  store.set('listChats', { ...oldListState, isAll: bool, loading: false })
}

const setChatList: (list: ChatList[]) => void = (list) => {
  const oldListState = store.getState().listChats

  store.set('listChats', { ...oldListState, list, loading: false, isAll: false })
}

const pushChatList: (list: ChatList[]) => void = (list) => {
  const oldListState = store.getState().listChats
  const newList = [...oldListState.list, ...list]

  store.set('listChats', { ...oldListState, list: newList, loading: false })
}

const setNewChatList = async () => {
  const api = new ChatsController()

  await api.getNewChatList({
    limit: getChatListLimit(),
    offset: 0,
    title: getChatListSearch(),
  })
}

const setSearchChatList: (search: string) => void = (search) => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, search })

  setNewChatList()
}

export type NavType = {
  pushNewItemsChat: () => Promise<void>
  setNewChatList: () => Promise<void>
  getChatListOffset: () => number
  getFilterChatList: ActionGetList
  getChatList: ActionGetList
  getChatListSearch: () => any
  setChatList: (list: ChatList[]) => void
  setSearchChatList: (string: string) => void
  startChatListLoading: () => void
  pushChatList: (list: ChatList[]) => void
  setChatListLimit: (limit: number) => void
  getChatListLimit: () => number
  setIsAllChatList: (bool: boolean) => void
}
const nav: NavType = {
  pushNewItemsChat,
  setIsAllChatList,
  setNewChatList,
  getChatListOffset,
  getChatListLimit,
  setChatListLimit,
  pushChatList,
  startChatListLoading,
  setSearchChatList,
  getFilterChatList,
  getChatList,
  getChatListSearch,
  setChatList,
}
export default nav
