import CompileMaster from '@/core/CompileJSX'
import Header from './UI/Header'
import styles from './styles.module.scss'

import Plus from '@/static/icons/plus.svg'
import Krest from '@/static/icons/krest.svg'
import FormSend from './UI/FormSend'
import MessageScreen from './UI/MessageScreen'
import AddUser from '@/entities/modals/AddUser'
import RemoveUser from '@/entities/modals/RemoveUser'
import Component from '@/core/Component'
import MenuChat from './UI/MenuChat'
import ButtonMenu from './UI/MenuChat/ButtonMenu'
import { ChatEventBus, CHATEVENTS } from './eventbus'
import { ChatWebSocketService } from '@/service/chat.ws.service'
import Actions from '@/store/Actions'
import { ChatsController } from '@/service/chats.service'
import { Message } from '@/types/chats'
import ModalFormDefault from '@/shared/modals/ModalFormDefault'

interface ChatType {
  header?: Component
  addUser?: Component
  removeUser?: Component
  removeChat?: Component
  messageList?: Component
  formSend?: Component
  chat?: {
    avatar: string | null
    chatID: number | null
    token: string | null
  }
}

export default class Chat extends Component<ChatType> {
  WS: ChatWebSocketService | null = null

  constructor(props: ChatType) {
    props.header = new Header({
      menu: new MenuChat({
        ref: 'menu',
        buttons: [
          new ButtonMenu({
            img: Plus,
            text: 'Добавить пользователя',
            onClick: () => {
              ChatEventBus.emit(CHATEVENTS.ADDUSER)
            },
          }),
          new ButtonMenu({
            img: Krest,
            text: 'Удалить пользователя',
            onClick: () => {
              ChatEventBus.emit(CHATEVENTS.REMOVEUSER)
            },
          }),
          new ButtonMenu({
            img: Krest,
            text: 'Удалить чат',
            onClick: () => {
              ChatEventBus.emit(CHATEVENTS.REMOVECHAT)
            },
          }),
        ],
      }),
    })
    props.messageList = new MessageScreen({})
    props.formSend = new FormSend({})
    super(props)
  }

  protected init(): void {
    const api = new ChatsController()

    this.children.removeChat = new ModalFormDefault({
      title: 'Удалить чат',
      buttonName: 'Удалить',
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: async () => {
        const chatID = Actions.getChatID()

        if (typeof chatID !== 'number') return false

        api.removeChat(chatID)
        return true
      },
    })

    this.children.addUser = new AddUser({
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: async (form) => {
        const userID = Number(form.add_name)
        const chatID = Actions.getChatID()
        if (typeof userID !== 'number' && typeof chatID !== 'number') {
          alert('нужна айдиха')
          return false
        }
        if (typeof chatID !== 'number') return false

        api.addUser({ chatID, userID })
        return true
      },
    })

    this.children.removeUser = new RemoveUser({
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: async (form) => {
        const userID = Number(form.remove_name)
        const chatID = Actions.getChatID()
        if (typeof userID !== 'number') {
          alert('нужна айдиха')
          return false
        }
        if (typeof chatID !== 'number') return false

        await api.removeUser({ chatID, userID })
        return true
      },
    })
  }

  protected registerEvents(): void {
    ChatEventBus.on(CHATEVENTS.ADDUSER, this.handleAddUser.bind(this))
    ChatEventBus.on(CHATEVENTS.REMOVEUSER, this.handleRemoveUser.bind(this))
    ChatEventBus.on(CHATEVENTS.REMOVECHAT, this.handleRemoveChat.bind(this))
  }

  handleRemoveChat() {
    let modal = this.children.removeChat
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
  }

  handleAddUser() {
    let modal = this.children.addUser
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
  }

  handleRemoveUser() {
    let modal = this.children.removeUser
    if (Array.isArray(modal)) return

    if (modal.props.isOpen) {
      modal.setProps({ isOpen: false })
    } else {
      modal.setProps({ isOpen: true })
    }
  }

  handleWSMessages(e: MessageEvent<any>) {
    const msg = JSON.parse(e.data) as Message[] | Message

    if (Array.isArray(msg)) {
      Actions.pushChatMessages(msg.reverse())
    } else {
      if (msg.type !== 'message') {
        console.log(msg)
      } else {
        Actions.pushChatMessages([msg])
      }
    }
  }

  handleOpen() {
    this.WS?.getMessages(0)
  }

  createSocket() {
    if (!this.props.chat) return
    const { chatID, token } = this.props.chat
    const userID = Actions.getUser()?.id

    if (!chatID) return
    if (!userID) return
    if (!token) return

    this.WS = new ChatWebSocketService(
      {
        chatID,
        token,
        userID,
      },
      this.handleWSMessages,
      this.handleOpen.bind(this)
    )
    const form = this.children.formSend as Component
    form.props.onSubmit = this.WS.sendMessage.bind(this.WS)
  }

  // не ресетит нормально
  protected componentDidMount(): void {
    this.createSocket()
  }

  resetChat() {
    this.WS?.closeWebsocket()
  }

  protected componentDidUpdate(oldProps: ChatType, newProps: ChatType): void {
    if (!this.WS) {
      this.createSocket()
      return
    }

    if (oldProps.chat && newProps.chat) {
      const { chatID, token } = oldProps.chat
      const { chatID: newId, token: newToken } = newProps.chat
      if (chatID !== newId && token !== newToken && this.WS) {
        // if change chat to reset
        this.resetChat()
        // and open new Connect
        if (newToken && newId) {
          const id = Actions.getUser()?.id
          if (newId && newToken && id) {
            this.WS?.reFetch({
              chatID: newId,
              token: newToken,
              userID: id,
            })
          }
        }
      }
    }
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.container}>
        <div class={styles.block}>
          {this.childrenHTML.elements.header}
          {this.childrenHTML.elements.messageList}
          {this.childrenHTML.elements.formSend}
        </div>
        {this.childrenHTML.elements.addUser}
        {this.childrenHTML.elements.removeUser}
        {this.childrenHTML.elements.removeChat}
      </div>
    )
  }
}
