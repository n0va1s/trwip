import { Router } from 'express'
import Channel from '../models/channel'
import { r } from '../db'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('channel', (req, resp, next, id) => {
    req.channel = Channel.get(id)
    next()
  })

  router.get('/:channel', async ({ trwip, channel }, res) => {
    try {
      res.json(await channel.getJoin({
        messages: {
          _apply (sequence) {
            return sequence.orderBy(r.asc('date'))
          }
        },
        members: true
      }))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/', async ({ trwip, params }, res) => {
    try {
      res.json(await trwip.getJoin({channels: true}) || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ trwip, body }, res) => {
    try {
      var channel = await Channel.save(body.channel)
      res.json(await trwip.addRelation(channel))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:channel', async ({ trwip, channel }, res) => {
    try {
      res.json(await trwip.removeRelation('channels', await channel))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
