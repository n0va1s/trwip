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
      res.json((await userDocument.getJoin({trwips: true})).trwips || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ userDocument, body, params }, res) => {
    try {
      const trwip = await Trwip.save(body.trwip)
      const user = await userDocument
      await createTrwipChannel(user, trwip)
      res.json(await userDocument.addRelation('trwips', trwip))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      const trwipDocument = await trwip
      res.json(await trwipDocument.deleteAll())
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}

async function createTrwipChannel (user, trwip) {
  user.addRelation('channels', await Channel.save({
    id: trwip.id + user.id,
    isGroup: true,
    name: trwip.title
  }))
}
