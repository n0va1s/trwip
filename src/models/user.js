import { thinky, type } from '../db'
import Trwip from './trwip'
import Channel from './channel'
import Message from './message'
import Notification from './notification'

let User = thinky.createModel('Users', {
  id: type.string(),
  name: type.string(),
  email: type.string(),
  password: type.string(),
  pathToProfilePic: type.string(),
  gender: type.string(),
  country: type.string(),
  bios: type.string(),
  link: type.string(),
  phone: type.string(),
  rate: type.number().default(0),
  numberOfRates: type.number().default(0),
  isEvaluated: type.boolean().default(false)
})

User.hasMany(Trwip, 'trwips', 'id', 'creatorId', { type: 'creator' })
Trwip.belongsTo(User, 'creator', 'creatorId', 'id', { type: 'creator' })

User.hasAndBelongsToMany(Trwip, 'membership', 'id', 'id', { type: 'members' })
Trwip.hasAndBelongsToMany(User, 'members', 'id', 'id', { type: 'members' })

User.hasAndBelongsToMany(Trwip, 'join_trwips', 'id', 'id', { type: 'joiners' })
Trwip.hasAndBelongsToMany(User, 'joiners', 'id', 'id', { type: 'joiners' })

User.hasAndBelongsToMany(Trwip, 'invited_trwips', 'id', 'id', { type: 'inviter' })
Trwip.hasAndBelongsToMany(User, 'inviter', 'id', 'id', { type: 'inviter' })

User.hasAndBelongsToMany(Channel, 'channels', 'id', 'id')
Channel.hasAndBelongsToMany(User, 'members', 'id', 'id')

User.hasMany(Message, 'messages', 'id', 'userId')
Message.belongsTo(User, 'from', 'userId', 'id')

Trwip.hasMany(Channel, 'channels', 'id', 'trwipId')
Channel.belongsTo(Trwip, 'from', 'trwipId', 'id')

User.hasMany(Notification, 'notifications', 'id', 'userId')
Notification.belongsTo(User, 'from', 'userId', 'id')

export default User
