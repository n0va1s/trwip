import User from '../../models/user'
import Trwip from '../../models/trwip'
import Notification from '../../models/notification'
import logger from '../../helpers/logger'

import {
  sendAcceptedInviteMail,
  sendInviteMail,
  sendUserJoinMail,
  sendAcceptedJoinMail
} from '../../scripts/sendMail'

import { getUserSocketId } from '.'

function socketTrwip (socket) {
  socket.on('join:request', async (data) => {
    try {
      await createJoinRequestNotification(data)
      const socketId = getUserSocketId(data.creatorId)
      socket.to(socketId).emit('new:notification')
    } catch (err) {
      logger.error(err)
    }
  })

  socket.on('join:accepted', async (data) => {
    try {
      await createJoinAcceptedNotification(data)
      const socketId = getUserSocketId(data.invitedId)
      socket.to(socketId).emit('new:notification')
    } catch (err) {
      logger.error(err)
    }
  })

  socket.on('invite:request', async (data) => {
    try {
      await createInviteRequestNotification(data)
      const socketId = getUserSocketId(data.invitedId)
      socket.to(socketId).emit('new:notification')
    } catch (err) {
      logger.error(err)
    }
  })

  socket.on('invite:accepted', async (data) => {
    try {
      await createInviteAcceptedNotification(data)
      const socketId = getUserSocketId(data.creatorId)
      socket.to(socketId).emit('new:notification')
    } catch (err) {
      logger.error(err)
    }
  })
}

async function createJoinRequestNotification (data) {
  const userRequester = await User.get(data.requesterId)
  const trwip = await Trwip.get(data.trwipId)
  const user = await User.get(data.creatorId)

  const firstName = userRequester.name.split(' ')[0]

  const notificationData = {
    message: `${firstName} solicitou um JoinTrwip na ${trwip.title}`,
    type: 'trwip',
    redirect: {
      link: `/trwip/${trwip.id}/join`,
      label: trwip.title
    }
  }

  const notification = await Notification.save(notificationData)
  await user.addRelation('notifications', notification)

  sendUserJoinMail(user, userRequester, trwip, data.host)

  logger.info(`Notification for ${userRequester.id} in the trwip ${trwip.title}`)
}

async function createJoinAcceptedNotification (data) {
  const invited = await User.get(data.invitedId)
  const trwip = await Trwip.get(data.trwipId)
  const creator = await User.get(data.creatorId)

  const firstName = creator.name.split(' ')[0]

  const notificationData = {
    message: `${firstName} aceitou seu JoinTrwip na ${trwip.title}`,
    type: 'trwip',
    redirect: {
      link: `/trwip/${trwip.id}`,
      label: trwip.title
    }
  }

  const notification = await Notification.save(notificationData)
  await invited.addRelation('notifications', notification)

  sendAcceptedJoinMail(invited, creator, trwip, data.host)

  logger.info(`Notification for ${invited.id} in the trwip ${trwip.title}`)
}

async function createInviteRequestNotification (data) {
  const invited = await User.get(data.invitedId)
  const trwip = await Trwip.get(data.trwipId)
  const creator = await User.get(data.creatorId)

  const firstName = creator.name.split(' ')[0]

  const notificationData = {
    message: `${firstName} convidou você para ${trwip.title}`,
    type: 'trwip',
    redirect: {
      link: `/profile/invite`,
      label: trwip.title
    }
  }

  const notification = await Notification.save(notificationData)
  await invited.addRelation('notifications', notification)

  sendInviteMail(invited.email, trwip, creator, data.host)

  logger.info(`Notification for ${invited.id} in the trwip ${trwip.title}`)
}

async function createInviteAcceptedNotification (data) {
  const invited = await User.get(data.invitedId)
  const trwip = await Trwip.get(data.trwipId)
  const creator = await User.get(data.creatorId)

  const firstName = invited.name.split(' ')[0]

  const notificationData = {
    message: `${firstName} aceitou seu convite para ${trwip.title}`,
    type: 'trwip',
    redirect: {
      link: `/trwip/${trwip.id}`,
      label: trwip.title
    }
  }

  const notification = await Notification.save(notificationData)
  await creator.addRelation('notifications', notification)

  sendAcceptedInviteMail(creator, invited, trwip, data.host)

  logger.info(`Notification for ${creator.id} in the trwip ${trwip.title}`)
}

export { socketTrwip }
