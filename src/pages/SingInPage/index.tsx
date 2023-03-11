import Component from '@/core/Component'
import SingIn from '@/widgets/SingIn'
import CompileMaster from '@/core/CompileJSX'
import { SingController } from '@/service/sing.service'

interface SingInPageType {
  modal?: Component
}

export default class SingInPage extends Component<SingInPageType> {
  constructor(props: SingInPageType) {
    const controller = new SingController()
    props.modal = new SingIn({
      size: { width: '340px', height: '615px' },
      onSubmit: controller.login,
    })
    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
