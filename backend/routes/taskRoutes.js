import express from 'express'
import Task from '../models/Tasks.js'
import taskController from '../controllers/taskController.js'


const router = express.Router()

router.post('/', taskController.createNewTask)

router.get('/', taskController.getTasks)

router.get('/:id', taskController.getTaskById)

router.delete('/:id', taskController.deleteTask)

router.patch ('/:id', taskController.updateStatus)

router.put('/:id', taskController.updateTask)


export default router