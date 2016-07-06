'use strict'

const Boom = require('boom')
const Uuid = require('node-uuid')
const Joi = require('joi')

exports.register = function (server, options, next) {
  const Db = server.app.db

  server.route({
    method: 'GET',
    path: '/items',
    handler: function (req, res) {
      Db.items.find((err, docs) => {
        if (err) return res(Boom.wrap(err, 'Internal MongoDB error'))
        console.log('Retrieved items!')
        res(docs)
      })
    }
  })

  server.route({
    method: 'DELETE',
    path: '/items/{id}',
    handler: function (req, res) {
      Db.items.remove({
        _id: req.params.id
      }, (err, docs) => {
        if (err) return res(Boom.wrap(err, 'Internal MongoDB error'))
        if (!doc) return res(Boom.notFound())
        res().code(204)
      })
    }
  })

  server.route({
    method: 'POST',
    path: '/items',
    handler: function (req, res) {
      const item = req.payload

      item._id = Uuid.v1()
      Db.items.save(item, (err, result) => {
        if (err) return res(Boom.wrap(err, 'Internal MongoDB error'))
        res(docs)
      })
    },

    config: {
      validate: {
        payload: {
          name: Joi.string().min(5).max(100).required(),
          price: Joi.number().required(),
          image: Joi.string().min(5).max(100).required()
        }
      }
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'routes-items'
}

