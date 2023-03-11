import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageText from '@/shared/messages/MessageText'
import Component from '@/core/Component'
import Actions from '@/store/Actions'

interface MessageScreenItem {
  message: Message
}

export class NotMessege extends Component {
  protected render(): HTMLElement {
    return (
      <div class={styles.not}>
        <span class={styles.not__text}>
          У вас пока нет Сообщений, начните общение прямо сейчас!
        </span>
      </div>
    )
  }
}

export default function MessageScreenItem({ message }: MessageScreenItem) {
  const { content, time, user_id: userID, is_read: isRead } = message

  const myID = Actions.getUser()?.id
  const isMy = myID === userID
  const isTextFormat = true

  if (!isTextFormat) {
    return 'MessageImage'
  }

  return (
    <li class={isMy ? styles.my : styles.your}>
      <div class={styles.msg_container}>
        {MessageText({ date: time, isMy, isRead, text: content })}
      </div>
    </li>
  )
}
