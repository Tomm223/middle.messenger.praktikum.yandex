import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Attach from '@/static/icons/attach.svg'
import Component from '@/core/Component'

interface ButtonAttachType {
  events?: any
}
// const src = new URL(Attach, import.meta.url)
const src = new URL(Attach)

export default class ButtonAttach extends Component<ButtonAttachType> {
  protected render(): HTMLElement {
    return (
      <button class={styles.btn}>
        <img class={styles.img} src={src} alt="Attach:file,photo..." />
      </button>
    )
  }
}
