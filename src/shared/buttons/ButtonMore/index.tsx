import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Dots from '@/static/icons/3dots.svg'
import DotsBlue from '@/static/icons/3dots_blue.svg'
import Component from '@/core/Component'

interface ButtonMoretype {
  isActive: boolean
  events?: Record<string, () => void>
}

export default class ButtonMore extends Component<ButtonMoretype> {
  protected render(): HTMLElement {
    return (
      <button class={this.props.isActive ? styles.btn_active : styles.btn}>
        <img class={styles.img} src={this.props.isActive ? DotsBlue : Dots} alt="dots" />
      </button>
    )
  }
}
