import { Router } from 'express'
import Trwip from '../models/trwip'
import Channel from '../models/channel'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('trwip', (req, resp, next, id) => {
    req.trwip = Trwip.get(id)
    next()
  })

  router.get('/', async ({ userDocument, params }, res) => {
    try {
      res.json(await userDocument.getJoin({membership: true}) || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      let userObj = await userDocument
      let trwipObj = await trwip
      const channelId = trwipObj.id + trwipObj.creatorId
      let channelObj = await Channel.get(channelId)
      userObj.addRelation('channels', channelObj)
      res.json(await userObj.addRelation('membership', await trwipObj))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      res.json(await userDocument.removeRelation('membership', await trwip))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
