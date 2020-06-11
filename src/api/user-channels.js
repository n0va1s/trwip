import { Router } from 'express'
import Channel from '../models/channel'
import User from '../models/user'
import { createPrivateChannel } from '../helpers/chat'
import { r } from '../db'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('channel', (req, resp, next, id) => {
    req.channel = Channel.get(id)
    next()
  })

  router.param('userId', (req, resp, next, id) => {
    req.anotherUser = User.get(id)
    next()
  })

  router.get('/channels-messages-count', async ({userDocument}, res, req) => {
    try {
      const user = await userDocument.getJoin({
        channels: {
          messages: true
        }
      })

      const channels = user.channels

      const messagesCount = channels.filter(channel =>
        channel.messages.filter(message => {
          return !message.read && message.userId !== user.id && !channel.isGroup
        }).length > 0
      ).length

      const hasMessages = messagesCount > 0

      res.json({ hasMessages, messagesCount })
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/messages_count', async ({ userDocument }, res, req) => {
    try {
      let messages = []
      let groupMessages = []

      const user = await userDocument.getJoin({
        channels: {
          messages: true
        }
      })

      const channels = user.channels
      channels.map(channel => {
        if (channel.isGroup) {
          const messagesCount = channel.messages.filter(message => {
            return message.recievers.indexOf(user.id) === -1 && message.userId !== user.id
          }).length

          if (messagesCount > 0) {
            groupMessages.push({
              messagesCount,
              channel: channel.id,
              isGroup: channel.isGroup
            })
          }
        } else {
          const messagesCount = channel.messages.filter(message => {
            return !message.read && message.userId !== user.id
          }).length

          if (messagesCount > 0) {
            messages.push({
              messagesCount,
              channel: channel.id,
              isGroup: channel.isGroup
            })
          }
        }
      })
      const response = {
        private: {
          hasMessages: messages.length > 0,
          messages
        },
        trwip: {
          hasMessages: groupMessages.length > 0,
          messages: groupMessages
        }
      }

      res.json(response)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/:channel', async ({ userDocument, channel }, res) => {
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

  router.get('/', async ({ userDocument, params }, res) => {
    try {
      res.json(await userDocument.getJoin({channels: true}) || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/:channel', async ({ userDocument, channel }, res) => {
    try {
      var target = await channel
      res.json(await userDocument.addRelation('channels', target))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:channel', async ({ userDocument, channel }, res) => {
    try {
      res.json(await userDocument.removeRelation('channels', await channel))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/verify-private/:userId', async ({ userDocument, anotherUser }, res) => {
    try {
      const user = await userDocument
      const another = await anotherUser

      const channel = await createPrivateChannel(user, another)

      res.json({ result: true, channel })
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
