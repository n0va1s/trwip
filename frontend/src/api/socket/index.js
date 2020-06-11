import io from 'socket.io-client'
import userApi from '../../api/user'

const socket = io(window.location.hostname + ':3000')

socket.on('connect', () => {
  userApi.registerSocket(socket.id)
})

export default socket
