import { Router } from 'express'
import Trwip from '../models/trwip'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('trwip', (req, resp, next, id) => {
    req.trwip = Trwip.get(id)
    next()
  })

  router.get('/', async ({ userDocument, params }, res) => {
    try {
      res.json((await userDocument.getJoin({invited_trwips: true})) || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      res.json(await userDocument.addRelation('invited_trwips', await trwip))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:trwip', async ({ userDocument, trwip }, res) => {
    try {
      res.json(await userDocument.removeRelation('invited_trwips', await trwip))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
