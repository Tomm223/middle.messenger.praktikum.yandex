export interface UserType {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface SingInRequest {
  login: string
  password: string
}
export interface SingInResponse {
  id: string | number
}
export interface SingUpResponse {
  id: string | number
}

export interface SingUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface SetPasswordRequest {
  oldPassword: string
  newPassword: string
}
