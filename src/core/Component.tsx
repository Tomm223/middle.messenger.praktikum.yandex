import { EventBus } from './EventBus'
import { v4 as uuidv4 } from 'uuid'
import CompileMaster from '@/core/CompileJSX'
import { deepEqual } from './deepEqual'

class Component<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const

  public _element: HTMLElement | null = null

  public id: string | number

  public ref: string | null

  public refs: Record<string, HTMLElement> = {}

  public children: Record<string, Component | Component[]>

  public childrenHTML: {
    lists: Record<string, HTMLElement[]>
    elements: Record<string, HTMLElement>
  } = { elements: {}, lists: {} }

  public props: P

  public eventBus: () => EventBus

  protected _setUpdate: boolean = false

  constructor(propsWithChildren: P) {
    const eventBus = new EventBus()

    const { props, children, ref } = this._getChildrenAndProps(propsWithChildren)

    this.children = this._makePropsProxy(children)
    this.props = this._makePropsProxy(props)
    this.ref = ref

    this.id = uuidv4()

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Component.EVENTS.INIT)
  }

  private _getChildrenAndProps(childrenAndProps: P): {
    ref: string | null
    props: P
    children: Record<string, Component | Component[]>
  } {
    const props: Record<string, unknown> = {}
    const children: Record<string, Component | Component[]> = {}
    let ref: string | null = null
    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (key === 'ref') {
        ref = value
        return
      }
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Component)) {
        children[key as string] = value
      } else if (value instanceof Component) {
        children[key as string] = value
      } else {
        props[key] = value
      }
    })

    return { props: props as P, children, ref }
  }

  private _childrenToHTML(children: Record<string, Component | Component[]>): {
    lists: Record<string, HTMLElement[]>
    elements: Record<string, HTMLElement>
  } {
    const childrenHTML = {
      lists: {} as Record<string, HTMLElement[]>,
      elements: {} as Record<string, HTMLElement>,
    }

    Object.keys(children).forEach((key) => {
      const codidate = children[key]
      if (Array.isArray(codidate)) {
        childrenHTML.lists[key] = codidate.map((child) => {
          return child.getContent() as HTMLElement
        })
      } else {
        childrenHTML.elements[key] = codidate.getContent() as HTMLElement
      }
    })
    return childrenHTML
  }

  private _searchRefs(htmlList: HTMLElement[]) {
    htmlList.forEach((tag) => {
      if (tag.hasAttribute('ref')) {
        const name = tag.getAttribute('ref') as string
        this.refs[name] = tag
      }
    })
  }

  protected addEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  protected removeEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
    this.registerEvents(eventBus)
  }

  protected registerEvents(eventBus: EventBus) {}

  private _init() {
    this.init()

    this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
  }

  protected init() {}

  private _componentDidMount() {
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
    this.componentDidMount()
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM)
  }

  public dispatchComponentDidUpdate() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDU, this.props, this.props)
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.shouldComponentUpdate(oldProps, newProps)) {
      Object.keys(this.children).forEach((key) => {
        const condidate = this.children[key]
        if (Array.isArray(condidate)) {
          condidate.forEach((child) => child.dispatchComponentDidUpdate())
        } else {
          condidate.dispatchComponentDidUpdate()
        }
      })
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
      this.componentDidUpdate(oldProps, newProps)
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {}

  protected shouldComponentUpdate(oldProps: P, newProps: P): boolean {
    const isEqual = deepEqual(oldProps, newProps)
    return !isEqual
  }

  get element() {
    return this._element
  }

  protected preRender() {}

  private _render() {
    this.preRender()

    //  трансорфмируем child-компоненты в html код для быстрой вставки
    const childrenHTML = this._childrenToHTML(this.children)

    // this.childrenHTML = childrenHTML
    this.childrenHTML = Object.assign(this.childrenHTML, childrenHTML)

    // build templateHTML by mount
    const template = this.render()

    if (!template.hasChildNodes() && !template.textContent && template.tagName !== 'INPUT') {
      throw Error('нет контента')
    }

    if (this.props) template.setAttribute('props', JSON.stringify(this.props))
    if (this.ref) template.setAttribute('ref', this.ref)
    if (this.id) template.setAttribute('id', JSON.stringify(this.id))

    if (this._element) {
      // this._element?.innerHTML = ''
      this._element.replaceWith(template)
    }
    this._element = template

    //распределяем рефы
    this._searchRefs([
      ...Object.values(this.childrenHTML.elements),
      ...Object.values(this.childrenHTML.lists).flat(),
    ])
    //чистка подписок
    this.removeEvents()

    //распределяем события
    this.addEvents()
  }

  protected render(): HTMLElement {
    return <template>template</template>
  }

  getContent() {
    return this.element
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return
    }

    this._setUpdate = false

    const { children, props } = this._getChildrenAndProps(nextProps)

    const oldTarget = { ...this.props }
    const oldChildren = { ...this.children }

    if (Object.values(children).length) {
      Object.assign(this.children, children)
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props)
    }

    if (Object.values(children).length) {
      this.eventBus().emit(Component.EVENTS.FLOW_CDU, { a: 1, b: 2 }, { c: '10' })

      this._setUpdate = false
    }

    if (this._setUpdate) {
      this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, this.props)
      // childs которые в пропсах если их
      //поменять то ререндера не будет
      this._setUpdate = false
    }
  }

  private _makePropsProxy(props: any) {
    const self = this
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        if (target[prop] !== value) {
          target[prop] = value
          self._setUpdate = true
        }

        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _show() {
    const html = this.getContent()
    if (!html) return
    html.style.display = 'block'
    this.eventBus().emit(Component.EVENTS.FLOW_CDM)
  }

  _hide() {
    const html = this.getContent()
    if (!html) return
    html.style.display = 'none'
    // this.eventBus().emit(Component.EVENTS.FLOW_CDM)
  }
}

export default Component
