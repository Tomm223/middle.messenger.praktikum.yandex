import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import { ButtonMenuBus, ButtonMenuEVENTS } from './eventbus'
import styles from './styles.module.scss'

interface ButtonMenuType {
  img: string
  text: string
  onClick?: () => void
}

export default class ButtonMenu extends Component<ButtonMenuType> {
  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ButtonMenuBus.on(ButtonMenuEVENTS.CLICK(this.id), this.handleClick.bind(this))
  }

  handleClick(e: MouseEvent) {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    this._element?.removeEventListener('click', this.handleClick.bind(this))
  }

  protected render(): HTMLElement {
    let img =
      typeof this.props.img === 'string' ? (
        <div class={styles.img}>
          <img src={this.props.img} alt="" />
        </div>
      ) : (
        <div class={styles.img}>{this.props.img}</div>
      )
    return (
      <button class={styles.btn}>
        {img}
        <p class={styles.text}>{this.props.text}</p>
      </button>
    )
  }
}
