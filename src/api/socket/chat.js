import logger from '../../helpers/logger'
import Message from '../../models/message'
import Channel from '../../models/channel'
import User from '../../models/user'
import { getUserSocketId } from './'

function socketChat (socket) {
  socket.on('message', async (data) => {
    try {
      var msg = {
        text: data.text,
        date: new Date().getTime()
      }
      await saveMessage(data, msg)
      msg.userId = data.from
      socket.broadcast.to(data.channelId).emit('new:message', msg)
    } catch (err) {
      logger.error(err)
    }
  })
  socket.on('new:room', async (data) => {
    const socketId = getUserSocketId(data.userId)
    socket.to(socketId).emit('new:connection', data.channelId)
  })
}

async function saveMessage (data, msg) {
  const message = await Message.save(msg)
  const user = await User.get(data.from)
  const channel = await Channel.get(data.channelId)
  await channel.addRelation('messages', await message)
  await user.addRelation('messages', await message)

  logger.data(`${user.name} send a message in room ${channel.name || 'private message'} `, msg)
}

export { socketChat }
