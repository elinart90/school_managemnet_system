const express = require('express')
const router = express.Router()

const parentController = require('../controller/parentController')
const parentValidation = require("../validator/parantValidator")
const validate = require("../validator/validate")

/**
 * @swagger
 * /api/v1/parent:
 *   post:
 *     summary: Add a new parent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The parent's name
 *               email:
 *                 type: string
 *                 description: The parent's email address
 *               phone:
 *                 type: string
 *                 description: The parent's phone number
 *     responses:
 *       201:
 *         description: Successfully created a new parent
 *       400:
 *         description: Bad request, invalid input
 */
 
// Route to add a new parent
// This route receives data for a new parent, validates it using parentValidation middleware,
// and calls parentController.addParent to create the new parent in the database.
router.post('/', parentValidation, validate, parentController.addParent)

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
 
// Route to get all parents
// This route retrieves all parent data from the database using parentController.getAllParent.
// It returns an array of parent objects.
router.get('/', parentController.getAllParent)

/**
 * @swagger
 * /api/v1/parent/{id}:
 *   get:
 *     summary: Retrieve a specific parent by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the parent to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved parent data
 *       404:
 *         description: Parent not found
 */
 
// Route to get a specific parent by ID
// This route retrieves a parent using the parent ID provided in the URL.
// If the parent exists, it returns the parent object; otherwise, a 404 error is returned.
router.get('/:id', parentController.getAParent)

/**
 * @swagger
 * /api/v1/parent/{id}:
 *   put:
 *     summary: Update a parent by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the parent to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The parent's name
 *               email:
 *                 type: string
 *                 description: The parent's email address
 *               phone:
 *                 type: string
 *                 description: The parent's phone number
 *     responses:
 *       200:
 *         description: Successfully updated the parent data
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Parent not found
 */
 
// Route to update a parent by ID
// This route allows you to update an existing parent's data by providing the parent ID in the URL.
// The request body contains the updated data (name, email, phone).
// It returns a success message or a 404 error if the parent is not found.
router.put('/:id', parentController.updateParent)

/**
 * @swagger
 * /api/v1/parent/{id}:
 *   delete:
 *     summary: Delete a parent by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the parent to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the parent
 *       404:
 *         description: Parent not found
 */
 
// Route to delete a parent by ID
// This route deletes a parent from the database using the parent ID provided in the URL.
// It returns a success message or a 404 error if the parent is not found.
router.delete('/:id', parentController.deleteParent)

module.exports = router
