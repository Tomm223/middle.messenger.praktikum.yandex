import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Img from '@/static/icons/pics_profile.png'
import Component from '@/core/Component'
import { API_BASE_RESOURCES } from '@/http/index'

interface AvatarType {
  link: string
  width?: string
}

export default class Avatar extends Component<AvatarType> {
  protected render(): HTMLElement {
    const style = this.props.width ? `width:${this.props.width}; height:${this.props.width};` : ''
    return (
      <div style={style} class={styles.block}>
        <img
          class={styles.img}
          src={this.props.link ? API_BASE_RESOURCES + this.props.link : Img}
          alt="Avatar"
        />
      </div>
    )
  }
}
