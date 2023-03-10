import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import WindowDefault from './components/WindowDefault'
import styles from './styles.module.scss'

interface ModalDefaultType {
  size?: Size
  isOpen: boolean
  background: Background
  onOut?: () => void
  children: Component
  style?: string
  window?: Component
}
type Background = 'dark' | 'light_white' | 'white' | 'transparent'

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class ModalDefault extends Component<ModalDefaultType> {
  constructor(props: ModalDefaultType) {
    props.style = `
   width: ${props.size?.width};
   height: ${props.size?.height};
   border-radius: ${props.size?.borderRadius};
   padding:40px 30px;
   padding-bottom:20px;
`
    props.window = new WindowDefault({
      style: props.style || '',
      children: props.children,
    })

    super(props)
  }

  handleClick(e: MouseEvent) {
    e.preventDefault()
    if (e.target === this._element) {
      if (this.props.onOut) {
        this.props.onOut()
      }
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    this._element?.removeEventListener('click', this.handleClick.bind(this))
  }

  interceptorShow() {
    const { isOpen } = this.props
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return
    }

    document.body.style.overflow = ''
  }

  protected componentDidMount(): void {
    this.interceptorShow()
  }

  protected componentDidUpdate(oldProps: ModalDefaultType, newProps: ModalDefaultType): void {
    this.interceptorShow()
  }

  protected render(): HTMLElement {
    return (
      <div
        class={`${this.props.isOpen ? '' : 'hidden'}  ${styles.back} ${
          styles[this.props.background]
        }`}
      >
        <div class={styles.block}>{this.childrenHTML.elements.window}</div>
      </div>
    )
  }
}
