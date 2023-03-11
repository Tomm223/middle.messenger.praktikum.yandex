import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface ButtonConstructorType {
  events?: Record<string, (...args: any) => void>
  name: string
  view: 'primary' | 'transparent'
  type?: string
}

export default class ButtonConstructor extends Component<ButtonConstructorType> {
  protected render(): HTMLElement {
    return (
      <button type={this.props.type} class={`${styles[this.props.view]} ${styles.btn}`}>
        {this.props.name}
      </button>
    )
  }
}
