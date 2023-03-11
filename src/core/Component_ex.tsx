import Component from './Component'
import CompileMaster from './CompileJSX'

interface ParentType {
  class?: string
  text?: string
  component?: Component
  mount?: boolean
}

export class Parent extends Component<ParentType> {
  protected componentDidMount(): void {
    this.props.mount = true
  }

  protected render(): HTMLElement {
    return (
      <div class={this.props.class}>
        <span>{this.props.text}</span>
        {this.childrenHTML.elements.component}
      </div>
    )
  }
}

interface ChildType {
  class?: string
  text: string
  isMount?: boolean
  isDispatchUpdate?: boolean
  events?: Record<string, () => void>
}

export class Child extends Component<ChildType> {
  protected componentDidMount(): void {
    this.props.isMount = true
  }

  public dispatchComponentDidUpdate() {
    this.props.isDispatchUpdate = true
    this.eventBus().emit(Component.EVENTS.FLOW_CDU, this.props, this.props)
  }

  protected render(): HTMLElement {
    return <p class={this.props.class}>{this.props.text}</p>
  }
}
