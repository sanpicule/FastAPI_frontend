import React, { FC, useState } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { useProcessAuth } from '../hooks/useProcessAuth'
import { useQueryUser } from '../hooks/useQueryUser'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../app/hooks'
import { selectTask, setEditedTask } from '../slices/appSlice'
import { useProcessTask } from '../hooks/useProcessTask'
import { TaskItem } from './taskItem'
import { useQuerySingleTask } from '../hooks/useQuerySingleTask'

export const Todo: FC = () => {
  const [id, setId] = useState('')
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { processTask } = useProcessTask()
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks()
  const { data: dataSingleTask, isLoading: isLoadingTask } = useQuerySingleTask(id)
  const dispatch = useDispatch()
  const editedTask = useAppSelector(selectTask)
  return (
    <div className='flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono'>
      <div className='flex items-center'>
        <ShieldCheckIcon className='h-8 w-8 mr-3 text-green-500 cursor-pointer' />
        <span className='text-center text-3xl font-extrabold'>CRUD Tasks</span>
      </div>
      <p className='my-3 text-sm'>{dataUser?.email}</p>
      <div className='flex justify-center items-center'>
        <h2>Logout</h2>
        <LogoutIcon
          onClick={logout}
          className='h-7 w-7 ml-2 text-blue-500 cursor-pointer'
        />
      </div>
      <form onSubmit={processTask}>
        <input
          className='my-3 mr-3 px-3 py-2 border border-gray-300'
          type='text'
          placeholder='title ?'
          onChange={(e) =>
            dispatch(setEditedTask({...editedTask, title: e.target.value}))
          }
          value={editedTask.title}
        />
        <input
          className='my-3 mr-3 px-3 py-2 border border-gray-300'
          type='text'
          placeholder='description ?'
          onChange={(e) =>
            dispatch(setEditedTask({...editedTask, description: e.target.value}))
          }
          value={editedTask.description}
        />
        <button
          disabled={!editedTask.title || !editedTask.description}
          className='disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded'
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoadingTasks ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {dataTasks?.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              setId={setId}
            />
          ))}
        </ul>
      )}
      <div className='mt-10 w-80 text-center h-56 pt-2 bg-slate-200 rounded-md'>
        <h2 className='font-bold text-2xl'>Selected Task</h2>
        {isLoadingTask && <p>Loading...</p>}
        {(dataSingleTask?.title || dataSingleTask?.description) &&
          <>
            <p>{dataSingleTask?.title}</p>
            <p>{dataSingleTask?.description}</p>
          </>
        }
      </div>
    </div>
  )
}

