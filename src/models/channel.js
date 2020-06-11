import { thinky, type } from '../db'
import Message from './message'

let Channel = thinky.createModel('Channels', {
  id: type.string(),
  name: type.string(),
  isGroup: type.boolean()
})

Channel.hasMany(Message, 'messages', 'id', 'channelId')
Message.belongsTo(Channel, 'channel', 'channelId', 'id')

export default Channel
