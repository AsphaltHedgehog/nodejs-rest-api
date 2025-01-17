const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const {contactsRouter, authRouter, userRouter} = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).json({ message: 'Email in use' })
  }
  res.status(500).json({ message: err.message })
})

module.exports = app
