import { Router } from 'express'
import jwtCheck from 'express-jwt'
import { r } from '../db'
import Message from '../models/message'
import Channel from '../models/channel'

export default ({ config, db }) => {
  let router = Router()

  router.param('channel', (req, resp, next, id) => {
    req.channel = Channel.get(id)
    next()
  })

  router.get('/:channel', async ({ channel, params }, res, req) => {
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

  router.put('/:channel/read-messages', jwtCheck({ secret: config.secret }), async ({ channel, user }, res) => {
    try {
      let channelDoc = await channel.getJoin({
        messages: true
      })
      if (channelDoc.isGroup) {
        channelDoc.messages.map(message => { message.recievers.push(user.id) })
      } else {
        channelDoc.messages.map(message => { message.read = true })
      }

      await channelDoc.saveAll({ messages: true })

      res.json({ result: true })
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ channel, body }, res) => {
    try {
      await Message.save(body.message)
      res.json(await channel.addRelation('messages', await body.message))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
