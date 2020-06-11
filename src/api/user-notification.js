import { Router } from 'express'
import Notification from '../models/notification'
import User from '../models/user'
import { r } from '../db'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('notification', (req, resp, next, id) => {
    req.notification = Notification.get(id)
    next()
  })

  router.param('userId', (req, resp, next, id) => {
    req.anotherUser = User.get(id)
    next()
  })

  router.get('/', async ({ userDocument }, res) => {
    try {
      const user = await userDocument.getJoin({notifications: {
        _apply (sequence) {
          return sequence.orderBy(r.desc('date'))
        }
      }})
      res.json(user.notifications)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/:notification/read', async ({ notification }, res) => {
    try {
      const notificationDoc = await notification
      notificationDoc.read = true
      notificationDoc.save()
      res.json(true)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
