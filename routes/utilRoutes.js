const express = require('express')
const { fork } = require('child_process')

const { Router } = express

const router = Router()

router.get('/randoms', async(request,response)=>{
  try{

    const cant= request.query.cant || 10e7

    const calculo = fork('./utils/calculo.js',[cant])
    calculo.send('start')
    calculo.on('message', arrayNumRandmsCoincidence=>{
      return response.send(arrayNumRandmsCoincidence)
    })
  } catch(error){
    console.log(error)
    return response.status(500).json({errors:[error]})
  }
})


module.exports = router;