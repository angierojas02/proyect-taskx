import { useState, useEffect } from "react"

const API_URL = 'http://localhost:3000/tasks'

export function useTasks () {
  const [tasks, setTasks] = useState([])
  const [taskToEdit, setTaskToEdit] = useState(null)

  /* VISUALIZAR TODAS LAS TAREAS */
  useEffect(() => {

    const viewTasks = async () => {
      try {

        const res = await fetch(API_URL)
        const resultTask = await res.json()

        setTasks(resultTask.data)
      } catch (error) {

        console.error("Hubo un error al conectar con el backend", error)
      }
    }
    viewTasks()
  },[])

  /* AÑADIR NUEVA TAREA */
  const addTask = async (newTaskData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskData)
      })

      if (response.ok) {
          const createdTask = await response.json()
          setTasks([...tasks, createdTask.data])
      }
      
    } catch (error) {
      console.error("Hubo un error al crear la tarea", error)
    }
  }

  /* ELIMINAR UNA TAREA */
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        //const updateTasks = task.filter(tsk => tsk._id !== id)
        setTasks(prevTasks => prevTasks.filter(tsk => tsk._id !== id))
      }

    } catch (error) {
       console.error("Hubo un error al eliminar tarea", error)
    }
  }

  /* MODIFICAR EL ESTADO DE UNA TAREA */
  const modifyTask = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus}) 
      })
      if (response.ok) {

        const updatedTasks = tasks.map(tsk => {
          if (tsk._id === id) {
            return {...tsk, status: newStatus }
          }
          return tsk
        })
        setTasks(updatedTasks)
      }
    } catch (error) {
      console.error("Hubo un error al crear la tarea", error)
    }
  }

  /* MODIFICAR UNA TAREA COMPLETA */

  const updateExistingTask = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })

      if(response.ok) {
        const taskFromServer = await response.json()

        const updatedTasks = tasks.map(tsk => tsk.id == id ? taskFromServer : tsk)
        setTasks(updatedTasks)
        setTaskToEdit(null)
      }

    } catch (error) {
      console.error("Hubo un error al editar la tarea", error)
    }
  }
  return {
    tasks,
    taskToEdit,
    setTaskToEdit,
    addTask,
    deleteTask,
    modifyTask,
    updateExistingTask
  }
}