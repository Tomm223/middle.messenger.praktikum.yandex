import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Arrow from '@/static/icons/arrow-circle.svg'
import Component from '@/core/Component'
import Router from '@/app/router'

interface LinkToBackType {
  onClick?: () => void
  href: string
}

export default class LinkToBack extends Component<LinkToBackType> {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    const tag = e.currentTarget as HTMLAnchorElement
    const pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
    Router.go(pathname)
  }

  protected addEvents(): void {
    let link = this._element as HTMLAnchorElement

    link.addEventListener('click', this.handleHref.bind(this))
  }

  protected removeEvents(): void {
    let link = this._element as HTMLAnchorElement
    link.removeEventListener('click', this.handleHref.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <a class={styles.link} route={this.props.href}>
        <img class={styles.img} src={Arrow} alt="" />
      </a>
    )
  }
}
