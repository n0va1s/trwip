import { Router } from 'express'
import Trwip from '../models/trwip'
import { r } from '../db'

export default ({ config, db }) => {
  let router = Router()

  router.param('trwip', (req, resp, next, id) => {
    req.trwip = Trwip.get(id)
    next()
  })

  router.get('/', async ({ query }, res) => {
    try {
      const trwips = await makeSearch(Trwip, query).run()
      const total = trwips.length
      res.json({trwips: trwips, total: total})
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/:trwip', async ({ trwip }, res) => {
    try {
      res.json(await trwip.getJoin({joiners: true, members: true, creator: true, evaluations: { user: true }}))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.put('/:trwip', async ({ trwip, body }, res) => {
    try {
      let doc = await trwip
      await doc.merge(body.trwip).save()
      res.json(await trwip.getJoin({joiners: true, members: true, creator: true, evaluations: { user: true }}))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}

function makeSearch (model, query) {
  model = model.getJoin({
    creator: {
      _apply (creator) {
        return creator.pluck('name')
      }
    },
    joiners: true,
    members: true
  })
  if (query.orderBy !== undefined) {
    var field = ''
    var value = ''
    if (query.field !== undefined) {
      field = query.field
    }
    if (query.value !== undefined) {
      value = query.value
    }
    let order = query.orderBy
    var filter = {}
    if (field !== '') {
      if (field === 'maxValue') {
        const max = Number(value)
        const min = Number(query.minValue)
        filter = function (doc) { return doc('minValue').gt(min).and(doc('maxValue').lt(max)).and(doc('finished').eq(false)).and(doc('public').eq(true)) }
      } else if (field === 'createdAt') {
        order = r.desc(function (doc) { return doc('createdAt') })
        filter = function (doc) { return doc('finished').eq(false).and(doc('public').eq(true)) }
        return model.filter(filter).orderBy(order).limit(5)
      } else if (field === 'startDateHome') {
        filter = function (doc) { return doc('finished').eq(false).and(doc('public').eq(true)) }
        return model.filter(filter).orderBy(order).limit(5)
      } else if (field === 'members') {
        order = r.desc(function (doc) { return doc('members').count() })
        filter = function (doc) { return doc('finished').eq(false).and(doc('public').eq(true)) }
        return model.filter(filter).orderBy(order).limit(5)
      } else if (field === 'memberName') {
        let queryString = '(?i)' + value
        filter = function (doc) { return doc('creator')('name').match(queryString).and(doc('finished').eq(false)).and(doc('public').eq(true)) }
      } else if (field === 'startDate') {
        const date = value.split('-')
        filter = function (doc) {
          return doc('startDate').month().eq(Number(date[0])).and(doc('startDate').year().eq(Number(date[1]))).and(doc('finished').eq(false)).and(doc('public').eq(true))
        }
      } else if (field === 'style') {
        filter = function (doc) { return doc('style').contains(value).and(doc('finished').eq(false)).and(doc('public').eq(true)) }
      } else {
        let queryString = '(?i)' + value
        filter = function (doc) { return doc(field).match(queryString).and(doc('finished').eq(false)).and(doc('public').eq(true)) }
      }
    }
    return model.orderBy(order).filter(filter)
  } else {
    return model.orderBy('')
  }
}
