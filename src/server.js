import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import * as db from './db'
import config from './config'
import api from './api'
import path from 'path'
import * as socket from './api/socket'

let app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json({
  limit: '5mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '15mb'
}))

db.init()
.then(db => {
  app.use('/api', api({ config, db }))
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
  socket.init(app)
})

export default app
