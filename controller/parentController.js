const Parent = require('../models/parent')

//*Add a new parent
const addParent = async(req, res, next) => {
    try {
        const { name, teleNumber, location, relationship, student} = req.body

        const parent = new Parent({ name, teleNumber, location, relationship, student})
        await parent.save()

        res.status(201).json({
            code: 201,
            status: true,
            message: "Parent added successfully",
            parent
        })
    } catch (error) {
        next(error)
    }
}

const getAllParent = async(req, res, next) => {
    try {
        const parent = await Parent.find().populate("student")

        res.status(200).json({
            code: 200,
            status: true,
            message: "Parents fetched successfully",
            parent
        })
        
    } catch (error) {
        next(error)
    }
}

const getAParent = async(req, res, next) => {
    try {
        const { id } = req.params

        const parent = await Parent.findById(id).populate("student")

        res.status(200).json({
            code: 200,
            status: true,
            message: "Parent fetch successfullly",
            parent
        })
        
    } catch (error) {
        next(error)
    }
}


const updateParent = async(req, res, next) => {
    try {
        const { id } = req.body
        const { name, teleNumber, location, relationship, student} = req.body

        const parent = await Parent.findById(id)
        if(!parent) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: "Parent not found"
            })
        }

        if(name) parent.name = name;
        if(teleNumber) parent.teleNumber = teleNumber
        if(location) parent.location = location
        if(relationship) parent.relationship = relationship
        if(student) parent.student = student

        await parent.save()
        res.status(200).json({
            code: 200,
            status: true,
            message: "Parent updated successfully",
            parent
        })
        
    } catch (error) {
        next(error)
    }
}


const deleteParent = async(req, res, next) => {
    try {
        const { id } = req.body

        const parent = await Parent.findByIdAndDelete(id)
        if(!parent) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: "Parent not found"
            })
        }

        res.status(200).json({
            code: 200,
            status: true,
            message: "parent deleted successfully",
          });
        
    } catch (error) {
        
    }
}

module.exports = {
    addParent,
    getAllParent,
    getAParent,
    updateParent,
    deleteParent
}