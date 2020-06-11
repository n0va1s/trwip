import { thinky, type } from '../db'

let Message = thinky.createModel('Messages', {
  id: type.string(),
  text: type.string(),
  date: type.date(),
  read: type.boolean().default(false),
  recievers: type.array().default([])
})

export default Message
