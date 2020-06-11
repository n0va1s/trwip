import logger from './logger'
import Channel from '../models/channel'

async function createPrivateChannel (user, anotherUser) {
  const channelId = getPrivateChannelId(user, anotherUser)
  const needCreation = !(await hasChannel(channelId))
  if (needCreation) {
    const channel = await Channel.save({
      id: channelId,
      isGroup: false
    })
    logger.debug(`Create private channel to ${user.name} and ${anotherUser.name}`, channel)
    await user.addRelation('channels', channel)
    await anotherUser.addRelation('channels', channel)
  }
  return channelId
}

function getPrivateChannelId (user, anotherUser) {
  return user.id > anotherUser.id
          ? user.id + anotherUser.id
          : anotherUser.id + user.id
}

async function hasChannel (channelId) {
  const channels = await Channel.getAll(channelId)
  return channels.length > 0
}

export { createPrivateChannel }
