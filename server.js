'use strict'

const Hapi = require('hapi')
const Mongo = require('mongojs')

const ItemsRoute = require('./routes/items')

const Server = new Hapi.Server()

Server.connection({
  port: process.env.PORT
})

Server.app.db = Mongo('mongodb://devteach:Dev16@apollo.modulusmongo.net:27017/unyqIz5a', ['items'])

Server.register([
  ItemsRoute
], err => {
  if (err) throw err

  Server.start((err) => {
    if (err) throw err
    console.log('Server running at:', Server.info.uri)
  })
})

