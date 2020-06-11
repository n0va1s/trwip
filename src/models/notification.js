import { thinky, type, r } from '../db'

let Notification = thinky.createModel('Notifications', {
  message: type.string(),
  type: type.string(),
  redirect: {
    link: type.string(),
    label: type.string()
  },
  date: type.date().default(r.now()),
  read: type.boolean().default(false)
})

export default Notification
