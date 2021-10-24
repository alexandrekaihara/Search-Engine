const express = require('express')
const app = express()

app.get('/search/', (req, res) => {
  res.send('Hello World!')
})

module.exports = {
  path: '/api/',
  handler: app
}