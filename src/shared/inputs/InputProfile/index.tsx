import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import { InputProfileEventBus, InputProfileEVENTS } from './eventbus'
import styles from './styles.module.scss'

interface InputProfileType {
  isEdit?: boolean
  name?: string
  label?: string
  text?: string
  type?: string
  error?: string
  style?: string
}

function handleChange(e: Event) {
  const input = e.target as HTMLInputElement
  InputProfileEventBus.emit(InputProfileEVENTS.CHANGE(input.id), input.value)
}

export default class InputProfile extends Component<InputProfileType> {
  intercaptorChange(value: string) {
    this.setProps({ text: value })
  }

  protected registerEvents(): void {
    InputProfileEventBus.on(InputProfileEVENTS.CHANGE(this.id), this.intercaptorChange.bind(this))
  }

  protected addEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.addEventListener('change', handleChange)
  }

  protected removeEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.addEventListener('change', handleChange)
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.itemList}>
        <div class={styles.block}>
          <label class={styles.label} for={this.props.name}>
            {this.props.label}
          </label>
          <input
            id={this.id}
            class={this.props.isEdit ? styles.input : 'hidden'}
            type={this.props.type}
            name={this.props.name}
            // disabled={!this.props.isEdit}
            value={this.props.isEdit ? this.props.text : ''}
          />

          <span class={this.props.isEdit ? 'hidden' : styles.text}>
            {this.props.isEdit ? '' : this.props.text}
          </span>
        </div>
        <div class={`${this.props.error ? '' : 'hidden'}  ${styles.error}`}>
          {this.props.error ? this.props.error : ''}
        </div>
      </div>
    )
  }
}
