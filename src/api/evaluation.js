import { Router } from 'express'
import Evaluation from '../models/evaluation'
import Trwip from '../models/trwip'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('evaluation', (req, resp, next, id) => {
    req.evaluation = Evaluation.get(id)
    next()
  })

  router.get('/', async ({ params }, res) => {
    try {
      let evaluations = await Evaluation.getJoin({
        user: true,
        trwip: true
      })

      res.json(evaluations)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/:evaluation', async ({ evaluation }, res) => {
    try {
      let wantedEvaluation = await evaluation.getJoin({
        user: true,
        trwip: true
      })

      res.json(wantedEvaluation)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ userDocument, body }, res) => {
    try {
      let trwip = await Trwip.get(body.trwipId).getJoin({
        evaluations: {
          _apply (evaluations) {
            return evaluations.count()
          },
          _array: false
        }
      })

      trwip = await makeTrwipAvarageEvaluation(trwip, body.evaluation)
      trwip.save()

      const evaluation = await Evaluation.save(body.evaluation)
      evaluation.addRelation('trwip', trwip)
      evaluation.addRelation('user', await userDocument)

      res.json(evaluation)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:evaluation', async ({ evaluation }, res) => {
    try {
      await evaluation.removeRelation('trwip')
      await evaluation.removeRelation('user')
      res.json(await evaluation.delete())
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}

async function makeTrwipAvarageEvaluation (trwip, newEvaluation) {
  const total = trwip.rate * trwip.evaluations

  const totalEvaluations = (trwip.evaluations + 1)
  const newRate = (total + newEvaluation.rate) / totalEvaluations

  trwip.rate = newRate
  return trwip
}
