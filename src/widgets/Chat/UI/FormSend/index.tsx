import ButtonArrow from '@/shared/buttons/ButtonArrow'
import ButtonAttach from '@/shared/buttons/ButtonAttach'
import InputMessage from '@/shared/inputs/InputMessage'
import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import Photo from '@/static/icons/pics_message.svg'
import File from '@/static/icons/file.svg'
import Local from '@/static/icons/local.svg'
import styles from './styles.module.scss'
import { FormSendEventBus } from './eventbus'
import MenuChat from '../MenuChat'
import ButtonFile from '../MenuChat/ButtonFile'

interface FormSendType {
  events?: any
  refs?: any
  isOpen?: boolean
  attach_btn?: Component
  attach?: Component
  btn?: Component
  input?: Component
  onSubmit?: (data: string) => void
}

export default class FormSend extends Component<FormSendType> {
  constructor(props: FormSendType) {
    props.isOpen = false
    props.input = new InputMessage({ name: 'message', placeholder: 'Сообщение' })
    props.btn = new ButtonArrow({})
    props.attach_btn = new ButtonAttach({
      events: {
        click: function () {
          FormSendEventBus.emit('menu-click')
        },
      },
    })
    props.attach = new MenuChat({
      ref: 'menu',
      buttons: [
        new ButtonFile({
          img: Photo,
          text: 'Фото или Видео',
          onSelect: () => {},
          inputName: 'photo/movie',
          accepting: 'images+videos',
        }),
        new ButtonFile({
          img: File,
          text: 'Файл',
          onSelect: () => {},
          inputName: 'file',
          accepting: 'files',
        }),
        new ButtonFile({
          img: Local,
          text: 'Локация',
          onSelect: () => {},
          inputName: 'location',
          accepting: 'local',
        }),
      ],
    })

    super(props)
  }

  handleSend(e: MouseEvent) {
    e.preventDefault()

    let value = this.getValue()
    if (!value) return

    if (this.props.onSubmit) {
      this.props.onSubmit(value)
    }
    this.resetValue()
  }

  getValue(): string {
    let form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
    let input = form['message'] as HTMLInputElement
    return input.value
  }

  resetValue() {
    let form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
    let input = form['message'] as HTMLInputElement
    input.value = ''
  }

  protected addEvents(): void {
    let form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
    let btn = form.getElementsByTagName('button')[0] as HTMLButtonElement

    btn.addEventListener('click', this.handleSend.bind(this))
  }

  protected removeEvents(): void {
    let form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
    let btn = form.getElementsByTagName('button')[0] as HTMLButtonElement

    btn.removeEventListener('click', this.handleSend.bind(this))
  }

  protected init(): void {
    FormSendEventBus.on('menu-click', () => {
      if (this.props.isOpen) {
        this.setProps({ isOpen: false })
      } else {
        this.setProps({ isOpen: true })
      }
    })
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.container}>
        <div class={styles.block}>
          {this.childrenHTML.elements.attach_btn}
          <form class={styles.form}>
            {this.childrenHTML.elements.input}
            <div class={styles.form__btn}>{this.childrenHTML.elements.btn}</div>
          </form>
          <div class={this.props.isOpen ? styles.menu_active : 'hidden'}>
            {this.childrenHTML.elements.attach}
          </div>
        </div>
      </div>
    )
  }
}
