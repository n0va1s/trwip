import logger from '../../helpers/logger'

function socketRoom (socket) {
  socket.on('joinRoom', (data) => {
    logger.debug(`${data.me} just enter in room ${data.room} `)
    socket.join(data.room)
  })

  socket.on('leaveRoom', (data) => {
    logger.debug(`${data.me} just leave the room ${data.room} `)
    socket.leave(data.room)
  })
}

export { socketRoom }
