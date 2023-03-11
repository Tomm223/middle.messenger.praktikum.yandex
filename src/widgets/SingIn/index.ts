import { connect } from '@/store/connect'
import SingIn from './component'

function map(state: any) {
  const { error, loading } = state.sing_in
  return {
    loading,
    error,
  }
}
export default connect(SingIn, map)
