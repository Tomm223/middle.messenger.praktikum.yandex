import ModalDefault from '@/shared/modals/ModalDefault'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'

interface RemoveUserType {
  onClose: () => void
  onSubmit: (form: Record<string, string>) => void
  isOpen: boolean
  size: Size
  modal?: Component
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class RemoveUser extends Component<RemoveUserType> {
  protected render(): HTMLElement {
    return (
      <div>
        {new ModalDefault({
          background: 'dark',
          isOpen: this.props.isOpen,
          size: this.props.size,
          onOut: this.props.onClose,
          children: new FormConstructorTitle({
            title: 'Удалить Пользователя',
            inputs: [
              new InputText({
                name: 'remove_name',
                label: 'Имя',
                error: null,
              }),
            ],
            buttons: [
              new ButtonConstructor({
                name: 'Удалить',
                view: 'primary',
                type: 'submit',
              }),
            ],
            onSubmit: this.props.onSubmit,
          }),
        }).getContent()}
      </div>
    )
  }
}