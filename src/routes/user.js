const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
userRouter.get('/:username', (req, res) => {

  userController.get(req.params.username, (err, result) => {

    if (err) {

      if (err === 'NOT_FOUND') {
        return res.status(404).json({
          status: 'error'
        })
      }

      return res.status(400).json({
        status: 'error'
      })
    }

    res.json(result)
  })
})
module.exports = userRouter
