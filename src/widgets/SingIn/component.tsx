import CompileMaster from '@/core/CompileJSX'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import Component from '@/core/Component'
import { ValidateSingIn } from './constants'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import Router from '@/app/router'
import { SingInRequest } from '@/types/user'
import LoaderFullPage from '@/shared/Loaders/LoaderFullPage'
import SingUnPage from '@/pages/SingUpPage'
import Nagivation from '@/pages/Navigation'
import SingInPage from '@/pages/SingInPage'

interface SingInType {
  size: Size
  onSubmit: (form: SingInRequest) => void
  modal?: Component
  loading?: boolean
  error?: string
  loader?: Component
}
interface Form {
  login: string
  password: string
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

const setLocation = (e: MouseEvent) => {
  e.preventDefault()
  Router.go('/sing-up')
}

export default class SingIn extends Component<SingInType> {
  constructor(props: SingInType) {
    props.modal = new ModalDefault({
      background: 'white',
      size: props.size,
      isOpen: true,
      onOut: () => {},
      children: new FormConstructorTitle({
        error: props.error,
        disable: props.loading,
        onSubmit: props.onSubmit,
        validate: ValidateSingIn,
        title: 'Вход',
        inputs: [
          new InputText({
            name: 'login',
            label: 'Логин',
          }),
          new InputText({
            name: 'password',
            label: 'Пароль',
            type: 'password',
          }),
        ],
        buttons: [
          new ButtonConstructor({
            name: 'Войти',
            type: 'submit',
            view: 'primary',
          }),
          new ButtonConstructor({
            name: 'Зарегестрироваться',
            view: 'transparent',
            events: {
              click: setLocation,
            },
          }) || <div></div>,
        ],
      }),
    })
    super(props)
  }

  protected componentDidUpdate(oldProps: SingInType, newProps: SingInType): void {
    if (newProps.error) {
      this.children?.modal?.children?.window?.children?.children.children.constructo?.setProps({
        error: newProps.error,
      })
    }
  }

  protected render(): HTMLElement {
    return (
      <div>
        {this.childrenHTML.elements.modal}
        {new LoaderFullPage({ isShow: !!this.props.loading }).getContent()}
      </div>
    )
  }
}
