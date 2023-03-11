import { validate } from 'uuid'
import { ValidateForm } from './types'

//login ^[a-zA-Z][a-zA-Z0-9-_\.]{6,20}$ ^[a-zA-Z0-9]+$
//name ^[A-zА-яЁё]{2,20}$
//pass /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
// email ^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$
// name /^[а-яА-Яa-zA-Z0-9]+$/
// phone /^[0-9\s]*$/
// email /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.
// [0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//email ^[^@s]+@[^@s]+.[^@s]+$
// ^[A-ZА-Я]{1}[a-zа-я\-]{0,254}$
// /^[A-ZА-Я]{1}[a-zа-я-]{2,254}$/
const RegName = RegExp(/^[A-ZА-Я]{1}[a-zа-я\-]{0,254}$/) //RegExp(/[а-я]/i) //RegExp(/^\s*(\w+)\s*$/) //RegExp(/[а-яё]/i) // RegExp(/^\w+$/) //RegExp(/^[A-zА-яЁё]{2,20}$/)
const RegLogin = RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/)
const RegPhone = RegExp(/^[0-9\s]{10,15}$/)
const RegEmail = RegExp(
  /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/
)
const RegPassword = RegExp(/(?=^.{0,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)

function getvalidateFunc(reg: any, messageError: string) {
  return (string: string) => {
    if (!string) {
      return 'Обязательное поле'
    }
    let re = reg
    let result = re.test(String(string))
    if (!result) {
      return messageError
    }
    return ''
  }
}

export const ValidatesForm = {
  login: getvalidateFunc(RegLogin, 'Логин должен содержать латинские буквы, от 6 букв'),
  first_name: getvalidateFunc(
    RegName,
    'Имя от 2 до 20 букв, с заглавной буквы, кириллица или латиница'
  ),
  second_name: getvalidateFunc(
    RegName,
    'Фамилия от 2 до 20 букв, с заглавной буквы, кириллица или латиница'
  ),
  password: getvalidateFunc(
    RegPassword,
    `Пароль должен содержать: cтрочные и прописные латинские буквы, 
      цифры, спецсимволы. Минимум 8 символов`
  ),
  email: getvalidateFunc(RegExp(RegEmail), 'Не корректный email'),
  phone: getvalidateFunc(RegExp(RegPhone), 'Не корректный номер телефона. Пример: 8(999)900-90-90'),
}

export const useValidation = (
  form: Record<string, any>,
  validations: Record<string, (str: string) => string>
) => {
  let isValid = true

  for (const key in form) {
    if (
      Object.prototype.hasOwnProperty.call(form, key) &&
      Object.prototype.hasOwnProperty.call(validations, key)
    ) {
      isValid = !validations[key](form[key])
    } else {
      throw new Error('validations record dont valid for formData')
    }
  }

  return isValid
}
