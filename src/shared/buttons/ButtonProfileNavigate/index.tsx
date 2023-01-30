import CompileMaster from '@/core/CompileJSX'
import Component from '@/utils/Component'
import styles from './styles.module.scss'

interface ButtonsProfileNavigate {
  text: string
  onClick?: () => void
  view: 'primary' | 'red'
}

export default class ButtonProfileNavigate extends Component<ButtonsProfileNavigate> {
  handler(e: MouseEvent) {
    e.preventDefault()
    if (!this.props.onClick) return
    this.props.onClick()
  }

  protected addEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement

    btn.addEventListener('click', this.handler.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <button type="button" class={styles[this.props.view]}>
          {this.props.text}
        </button>
      </div>
    )
  }
}
