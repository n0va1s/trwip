import { Router } from 'express'
import { sendInviteMail } from '../scripts/sendMail'
import User from '../models/user'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.post('/', async ({ trwip, body }, res) => {
    try {
      const trwipDoc = await trwip.getJoin({
        creator: {
          _apply (creator) {
            return creator.pluck('name')
          }
        }
      })

      const user = trwipDoc.creator
      await sendEmails(body.emails, trwipDoc, user, body.host)
      res.json({result: 'Sended invites'})
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/invite-many', async ({ trwip, body }, res) => {
    try {
      const users = body.users
      users.forEach(async user => {
        let userDocument = await User.get(user.id)
        await userDocument.addRelation('invited_trwips', await trwip)
      })
      res.json({ result: 'Sended invites' })
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  return router
}

function sendEmails (emails, trwipDoc, user, host) {
  emails.forEach((email) => {
    sendInviteMail(email, trwipDoc, user, host)
  })
}
