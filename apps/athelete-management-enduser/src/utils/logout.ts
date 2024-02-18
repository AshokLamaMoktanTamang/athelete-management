import { removeItem } from '.'

export default () => {
  removeItem('token')
  removeItem('refresh-token')
  removeItem('user')
  window.location.replace('/login')
}
