const express = require('express')
const router = express.Router()


const parentController = require('../controller/parentController')
const parentValidation = require("../validator/parantValidator")
const validate = require("../validator/validate")

router.post('/', parentController.addParent)

router.get('/', parentController.getAllParent)

router.get('/:id', parentController.getAParent)

router.put('/:id', parentController.updateParent)

router.delete('/:id', parentController.deleteParent)


module.exports = router