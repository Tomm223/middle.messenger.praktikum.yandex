import { connect } from '@/store/connect'
import MessageScreen from './component'

function map(state: any) {
  const { messages, loading } = state.chat
  return { messages, loading }
}

export default connect(MessageScreen, map)
