const jsonServer = require('json-server')
const auth = require('json-server-auth')
const path = require('path')
const express = require('express')

exports.handler = async (event, context) => {
  const server = jsonServer.create()
  const router = jsonServer.router(path.join(__dirname, 'db.json'))
  const middlewares = jsonServer.defaults()

  server.db = router.db

  server.use(express.static(path.join(__dirname, 'build')))
  server.use(middlewares)
  server.use(auth)
  server.use(router)

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
  })

  const PORT = 8000

  server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`)
  })
}
