import { Router } from 'express'
import User from '../models/user'
import { r } from '../db'
import jwt from 'jsonwebtoken'
import jwtCheck from 'express-jwt'
import lodash from 'lodash'
import { sendWelcomeMail, sendForgotPasswordMail } from '../scripts/sendMail'
import bcrypt from 'bcrypt'
import config from '../config'
import { initUserSocket } from './socket'

const SALT_ROUNDS = config.SALT_ROUNDS

export default ({ config, db }) => {
  let router = Router()

  router.param('user', (req, resp, next, id) => {
    req.userDocument = User.get(id)
    next()
  })

  router.get('/', async ({ query }, res) => {
    try {
      let filter = {}
      if (query.name) {
        let queryString = `(?i)${query.name}`
        filter = function (doc) { return doc('name').match(queryString) }
      }
      res.json(await User.orderBy('name').filter(filter).without('password').run())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.get('/emails', async ({ params }, res) => {
    try {
      let userEmails = r.table('Users').getField('email')

      res.json(await userEmails.run())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.get('/current-user', jwtCheck({secret: config.secret}), async ({ user }, res) => {
    try {
      res.json(await User.get(user.id).getJoin({
        join_trwips: true,
        membership: true,
        invited_trwips: true,
        notifications: {
          _apply (sequence) {
            return sequence.orderBy(r.asc('date'))
          }
        },
        channels: {
          members: true,
          messages: {
            _apply (sequence) {
              return sequence.orderBy(r.desc('date')).limit(1)
            }
          }
        }
      }))
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.name })
    }
  })

  router.get('/:user', async ({ userDocument }, res) => {
    try {
      res.json(await userDocument.without('password'))
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.name })
    }
  })

  router.get('/:user/password', async ({ userDocument }, res) => {
    try {
      res.json((await userDocument).password)
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/', async ({ body }, res) => {
    try {
      let userDoc = body.user
      const password = await hashPassword(userDoc.password)
      userDoc.password = password
      const user = await User.save(userDoc)
      sendWelcomeMail(user)
      res.json(user)
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/authenticate', async ({ body }, res) => {
    try {
      if (body.password === null || body.email === null) {
        res.status(400).end() // Status code 400: Bad request
      } else {
        const users = await User.filter({ email: body.email }).run()
        const user = users[0]
        if (user) {
          const isEqualPass = await bcrypt.compare(body.password, user.password)
          if (isEqualPass) {
            const token = createToken(user, config)

            const socketId = body.socketId

            if (socketId) {
              initUserSocket(socketId, user)
            }

            res.json({user, token})
          } else {
            res.status(401).json({error: 'Não foi possível realizar login'})
          }
        } else {
          res.status(401).json({error: 'Não foi possível realizar login'})
        }
      }
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/:user/evaluate', async ({ userDocument, body }, res) => {
    try {
      let user = await userDocument
      user.numberOfRates++

      const previousRate = user.rate
      const newRate = (previousRate + body.rate) / user.numberOfRates
      user.rate = newRate
      user.isEvaluated = true

      await user.save()

      res.json(user)
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/forgot-password', async ({ body }, res) => {
    try {
      let user = (await r.db('test').table('Users').filter({ email: body.email }))[0]

      if (user) {
        const host = body.host
        sendForgotPasswordMail(user, host)
        res.json(true)
      } else {
        res.json(false)
      }
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.put('/:user', async ({ userDocument, body }, res) => {
    try {
      const doc = await userDocument
      const user = body.user
      if (user.password) {
        user.password = await hashPassword(user.password)
        console.log(user.password)
      }
      res.json(await doc.merge(body.user).save())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.delete('/:user', async ({ userDocument }, res) => {
    try {
      res.json(await userDocument.delete())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/register_socket', jwtCheck({secret: config.secret}), async ({ body, user }, res) => {
    try {
      if (user) {
        let userDoc = await User.get(user.id).without('password').execute()
        const socketId = body.socketId
        if (socketId) {
          initUserSocket(socketId, userDoc)
        }
        res.status(200).json({ success: true })
      } else {
        res.status(401).json({ success: false })
      }
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.name })
    }
  })

  return router
}

function createToken (user, config) {
  return jwt.sign(lodash.pick(user, 'id'), config.secret)
}

async function hashPassword (password) {
  var hashedPass = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPass
}
