import React, { FC, memo } from 'react'
import { useAppDispatch } from '../app/hooks'
import { useMutateTask } from '../hooks/useMutateTask'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Task } from '../types/types'
import { setEditedTask } from '../slices/appSlice'

const TaskItemMemo: FC<
  Task & {
    setId: React.Dispatch<React.SetStateAction<string>>
  }
> = ({ id, title, description, setId }) => {
  const dispatch = useAppDispatch()
  const { deleteTaskMutation } = useMutateTask()
  return (
    <li className='bg-blue-200 p-2 mt-2 rounded-lg shadow-md hover:scale-105 transition-transform'>
      <span
        className='font-bold cursor-pointer'
        onClick={() => setId(id)}
      >
        {title}
      </span>
      <div className='flex float-right ml-20'>
        <PencilAltIcon
          className='h-5 w-5 mx-1 text-blue-500 cursor-pointer'
          onClick={() => {
            dispatch(
              setEditedTask({
                id: id,
                title: title,
                description: description
              })
            )
          }}
        />
        <TrashIcon
          className='h-5 w-5 mx-1 text-blue-500 cursor-pointer'
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}

export const TaskItem = memo(TaskItemMemo)