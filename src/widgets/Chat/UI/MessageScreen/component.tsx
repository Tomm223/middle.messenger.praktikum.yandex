import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageScreenItem, { NotMessege } from './item'
import Component from '@/core/Component'
import LoaderDefault from '@/shared/Loaders/LoaderDefault/defualt'

interface MessageScreenType {
  messages?: Message[]
  loading?: boolean
  loader?: Component
}

export default class MessageScreen extends Component<MessageScreenType> {
  constructor(props: MessageScreenType) {
    props.loader = new LoaderDefault({
      width: '60px',
      borderWidth: '2px',
    })

    super(props)
  }

  dropDown() {
    if (!this._element?.getElementsByTagName('li').length) return
    const collection = this._element?.getElementsByTagName('li')
    let lastItem = collection.item(collection.length - 1) as HTMLLIElement

    lastItem.scrollIntoView()
  }

  protected componentDidMount(): void {
    this.dropDown()
  }

  protected componentDidUpdate(oldProps: MessageScreenType, newProps: MessageScreenType): void {
    this.dropDown()
  }

  protected render(): HTMLElement {
    let msgs
    // Actions.setChatMessages([])
    if (this.props.messages?.length) {
      msgs = this.props.messages.map((message) => MessageScreenItem({ message }))
    } else if (this.props.loading) {
      msgs = [this.childrenHTML.elements.loader]
    } else {
      msgs = [new NotMessege({}).getContent()]
    }

    return (
      <div class={styles.container}>
        <ul class={styles.list}>
          <li style="opacity:0;">zero</li>
          {...msgs}
          <li style="opacity:0;">zero</li>
        </ul>
      </div>
    )
  }
}
