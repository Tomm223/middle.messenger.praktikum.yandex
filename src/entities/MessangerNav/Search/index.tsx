import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import ButtonSearch from './UI/button'
import InputSearch from './UI/input'
import { EVENTS, SearchEventBus } from './eventbus'
import { debounce } from '@/utils/debounce'

interface SearchType {
  inputName?: string
  isFocus?: boolean
  button?: Component
  input?: Component
  onChange?: (value: string) => void
}

function handleVisible(e: MouseEvent) {
  e.preventDefault()
  SearchEventBus.emit(EVENTS.VISIBLE, e)
}

function handleBlur(e: FocusEvent) {
  const input = e.target as HTMLInputElement
  if (!input.value) {
    SearchEventBus.emit(EVENTS.VISIBLE, e)
  }
}

export default class Search extends Component<SearchType> {
  constructor(props: SearchType) {
    props.isFocus = false
    props.button = new ButtonSearch({ events: { click: handleVisible } })
    props.input = new InputSearch({
      name: props.inputName || '',
      events: {
        keyup: debounce((e) => SearchEventBus.emit(EVENTS.INPUT_ON_CHANGE, e), 300),
        blur: handleBlur,
      },
    })

    super(props)
  }

  onFocus() {
    if (this.props.isFocus === true) {
      this.setProps({ isFocus: false })
    } else {
      this.setProps({ isFocus: true })
    }
  }

  onInputChange(e: Event) {
    const input = e.target as HTMLInputElement

    if (this.props.onChange) {
      this.props.onChange(input.value)
    }
  }

  protected registerEvents(): void {
    SearchEventBus.on(EVENTS.VISIBLE, this.onFocus.bind(this))
    SearchEventBus.on(EVENTS.INPUT_ON_CHANGE, this.onInputChange.bind(this))
  }

  toFocus() {
    if (this.props.isFocus && !Array.isArray(this.children.input)) {
      const input = this._element?.getElementsByTagName('input')[0]
      input?.focus()
    }
  }

  protected componentDidMount(): void {
    this.toFocus()
  }

  protected componentDidUpdate(): void {
    this.toFocus()
  }

  protected render(): HTMLElement {
    if (this.props.isFocus) {
      return (
        <form class={styles.form_active}>
          {/* {this.childrenHTML.elements.input} */}
          {new InputSearch({
            name: this.props.inputName || '',
            events: {
              keyup: debounce((e) => SearchEventBus.emit(EVENTS.INPUT_ON_CHANGE, e), 300),
              blur: handleBlur,
            }, //keyup: handleChange
          }).getContent()}
        </form>
      )
    }

    return <form class={styles.form}>{this.childrenHTML.elements.button}</form>
  }
}
