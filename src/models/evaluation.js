import { thinky, type } from '../db'
import User from './user'
import Trwip from './trwip'

let Evaluation = thinky.createModel('Evaluations', {
  id: type.string(),
  rate: type.number(),
  destinationRate: type.number(),
  opinion: type.string(),
  recommend: type.string()
})

User.hasMany(Evaluation, 'evaluations', 'id', 'userId')
Evaluation.belongsTo(User, 'user', 'userId', 'id')

Trwip.hasMany(Evaluation, 'evaluations', 'id', 'trwipId')
Evaluation.belongsTo(Trwip, 'trwip', 'trwipId', 'id')

export default Evaluation
