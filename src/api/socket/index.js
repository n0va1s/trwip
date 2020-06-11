import Server from 'socket.io'
import http from 'http'
import logger from '../../helpers/logger'
import { socketChat } from './chat'
import { socketTrwip } from './trwip'
import { socketRoom } from './room'
import config from '../../config'

const port = process.env.PORT || config.port || 3000

let io

const userSockets = new Map()

function init (app) {
  const server = http.Server(app)
  server.listen(port)

  logger.info(`Server started on ${port}!`)

  io = new Server(server)

  io.sockets.on('connection', function (socket) {
    socketChat(socket)
    socketRoom(socket)
    socketTrwip(socket)
  })

  return io
}

function initUserSocket (socketId, user) {
  const socket = io.sockets.connected[socketId]
  socket.user = user
  logger.info(`Add the user id ${user.id} to reference the socket id ${socketId}`)
  userSockets.set(user.id, socketId)
}

function getUserSocket (userId) {
  return io.sockets.connected[userSockets.get(userId)]
}

function getUserSocketId (userId) {
  return userSockets.get(userId)
}

export { init, io, initUserSocket, getUserSocket, getUserSocketId }
