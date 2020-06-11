import { version } from '../../package.json'
import { Router } from 'express'
import userRouter from './user'
import trwipRouter from './trwip'
import inviteRouter from './trwip-invites'
import userCreatorTrwipRouter from './user-creator-trwip'
import userMemberTrwipRouter from './user-member-trwip'
import userJoinTrwipRouter from './user-join-trwip'
import userInviteTrwipRouter from './user-invite-trwip'
import userNotification from './user-notification'
import imageUploadRouter from './imageUpload'
import channelMessagesRouter from './channel-messages'
import userChannelsRouter from './user-channels'
import trwipChannelsRouter from './trwip-channels'
import evaluationRouter from './evaluation'
import config from '../config'
import jwt from 'express-jwt'

var jwtCheck = jwt({
  secret: config.secret
}).unless({
  path: [
    '/api/image-upload',
    '/api/trwips/',
    /\/api\/trwips/i,
    '/api/user/authenticate',
    /\/api\/user/i,
    '/api/',
    '/api'
  ]
})

export default ({ config, db }) => {
  let api = Router()

  // Add model routes
  var users = userRouter({ config, db })
  var trwips = trwipRouter({ config, db })
  api.use('/', jwtCheck)
  api.use('/image-upload', imageUploadRouter({ config, db }))
  api.use('/trwips', trwips)
  api.use('/user', users)
  api.use('/channels', channelMessagesRouter({ config, db }))
  users.use('/:user/trwip', userCreatorTrwipRouter({ config, db }))
  users.use('/:user/member_trwip', userMemberTrwipRouter({ config, db }))
  users.use('/:user/join_trwip', userJoinTrwipRouter({ config, db }))
  users.use('/:user/channels', userChannelsRouter({ config, db }))
  users.use('/:user/evaluation', evaluationRouter({ config, db }))
  users.use('/:user/notifications', userNotification({ config, db }))
  trwips.use('/:trwip/channels', trwipChannelsRouter({ config, db }))
  trwips.use('/:trwip/invite', inviteRouter({ config, db }))
  users.use('/:user/invite_trwip', userInviteTrwipRouter({ config, db }))

  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
