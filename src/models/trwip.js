import { thinky, type, r } from '../db'

let Trwip = thinky.createModel('Trwips', {
  createdAt: type.date().default(r.now()),
  title: type.string(),
  link: type.string(),
  description: type.string(),
  numberOfMembers: type.number(),
  destination: type.string(),
  videoUrl: type.string(),
  style: [type.string()],
  country: type.string(),
  script: type.string(),
  profiles: [type.string()],
  maxValue: type.number(),
  minValue: type.number(),
  observations: type.string(),
  public: type.boolean(),
  startDate: type.date(),
  endDate: type.date(),
  finished: type.boolean().default(false),
  rate: type.number().default(0),
  image: type.string().default('uploads/trwipMainHeader4.jpg')
})

export default Trwip
