import React, { useContext, useState } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { firebaseReducer } from '../context/firebase/firebaseReducer'

export const Form = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)

  const handlerSubmit = (e) => {
    e.preventDefault()
    setValue(e.target.value)
    if (value && value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show('Заметка создана!!', 'success')
        })
        .catch(() => {
          alert.show('Что-то пошло не так!!', 'danger')
        })

      setValue('')
    } else {
      alert.show('Введите название заметки!!')
    }
    // alert.show(value, 'success')
  }

  return (
    <form onSubmit={handlerSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Добавление задания
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Введите новое заметку"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  )
}
