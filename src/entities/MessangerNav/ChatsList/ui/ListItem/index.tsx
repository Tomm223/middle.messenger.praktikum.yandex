import CompileMaster from '@/core/CompileJSX'
import { ChatList } from 'src/types/chats'
import Avatar from '@/shared/Avatar'
import Time from '@/shared/Time/default'
import styles from './styles.module.scss'
import UnRead from '../UnReadCount'
import Component from '@/core/Component'

interface ChatListItem {
  onClick: (id: number) => void
  chat: ChatList
}

export default class ChatsListItem extends Component<ChatListItem> {
  handlerClick(e: MouseEvent) {
    if (this.props.onClick) {
      this.props.onClick(this.props.chat.id)
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handlerClick.bind(this))
  }

  protected removeEvents(): void {
    this._element?.removeEventListener('click', this.handlerClick.bind(this))
  }

  protected render(): HTMLElement {
    const defaultSrcImg = ''

    const content = this.props.chat.last_message
      ? this.props.chat.last_message.content
      : 'Нет сообщений'
    const rightSide = this.props.chat.last_message ? (
      <div class={styles.right}>
        <div class={styles.time}>
          {Time({ date: this.props.chat.last_message?.time, view: 'gray' })}
        </div>
        <div class={styles.unread}>
          {new UnRead({ number: this.props.chat.unread_count }).getContent()}
        </div>
      </div>
    ) : (
      <div></div>
    )

    return (
      <li class={styles.item}>
        <a class={styles.link} href="#">
          <div class={styles.avatar}>
            {Avatar({ link: this.props.chat.last_message?.user.avatar || defaultSrcImg })}
          </div>
          <div class={styles.body}>
            <p class={styles.body__title}>{this.props.chat.title}</p>
            <p class={styles.body__content}>{content}</p>
          </div>
          {rightSide}
        </a>
      </li>
    )
  }
}
