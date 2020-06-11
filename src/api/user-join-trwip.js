import { Router } from 'express'
import Trwip from '../models/trwip'
import User from '../models/user'

import { createPrivateChannel } from '../helpers/chat'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('trwip', (req, resp, next, id) => {
    req.trwip = Trwip.get(id)
    next()
  })

  router.get('/', async ({ userDocument, params }, res) => {
    try {
      res.json((await userDocument.getJoin({join_trwips: true})) || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      const trwipData = await trwip
      const user = await userDocument
      const creator = await User.get(trwipData.creatorId)

      await createPrivateChannel(user, creator)

      res.json(await userDocument.addRelation('join_trwips', trwipData))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      res.json(await userDocument.removeRelation('join_trwips', await trwip))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
