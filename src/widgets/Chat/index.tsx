import { connect } from '@/store/connect'
import Chat from './component'

function map(state: any) {
  const { chatID, token } = state.chat
  const chat = { chatID, token }
  return { chat }
}
export default connect(Chat, map)
