const express = require('express')
const router = express.Router()


const parentController = require('../controller/parentController')
const parentValidation = require("../validator/parantValidator")
const validate = require("../validator/validate")


/**
 * @swagger
 * /api/v1/parent:
 *   get:
 *     summary: Retrieve all parent data
 *     responses:
 *       200:
 *         description: Successfully retrieved parent data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The parent ID
 *                   name:
 *                     type: string
 *                     description: The parent name
 */



router.post('/', parentValidation, validate, parentController.addParent)

router.get('/', parentController.getAllParent)

router.get('/:id', parentController.getAParent)

router.put('/:id', parentController.updateParent)

router.delete('/:id', parentController.deleteParent)


module.exports = router