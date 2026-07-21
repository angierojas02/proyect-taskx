import Task from '../models/Tasks.js'
import { validateTask } from '../schema/Task.js'

const getTasks = async (req, res, next) => {
    try {
        const allTasks = await Task.find()
        return res.status(200).json({
            ok: true,
            data: allTasks
        })
    } catch (error) {
        next(error)
    }
}


const getTaskById = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const task = await Task.findById(taskId)

        if (!task) {
            const errorCustom = new Error('La tarea que buscas no existe')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }
        return res.status(200).json({
            ok: true,
            data: task
        })
    } catch (error) {
        next(error)
    }
}

const createNewTask = async (req, res, next) => {
    try {
        
        const result = validateTask(req.body)

        if (!result.success) {
            const errorValidation = new Error('Los datos de entrada son inválidos')
            errorValidation.statusCode = 400
            errorValidation.detalles = result.error.format()
            return next(errorValidation)
        }

        const newTask = new Task(result.data)
        await newTask.save()

        return res.status(201).json({
            ok: true,
            data: newTask
        })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const deleteTask = await Task.findByIdAndDelete(taskId)

        if (!deleteTask) {
            const errorCustom = new Error('La tarea que quieres eliminar no existe')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }

        return res.status(200).json({
            ok: true,
            data: deleteTask
        })
    } catch (error) {
        next(error)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const task = await Task.findById(taskId)

        if(!task) {
            const errorCustom = new Error('La tarea que quieres actualizar no existe')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }

        const { status } = req.body
        task.status = status
        const updateTask = await task.save()

        return res.json({
            ok: true,
            data: updateTask
        })
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const result = validateTask(req.body)

        const updateTask = await Task.findByIdAndUpdate(
            taskId,
            result.data,
            { new: true, runValidators: true}
        )

        if (!updateTask) {
            const errorCustom = new Error('La tarea que quieres actualizar no existe')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }

        return res.status(200).json({
            ok: true,
            data: updateTask
        })
    } catch (error) {
        next(error)
    }
    
}

export default {
    getTasks,
    getTaskById,
    createNewTask,
    deleteTask,
    updateStatus,
    updateTask
}