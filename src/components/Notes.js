import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
export const Notes = ({ notes, onRemove }) => {
  const alert = useContext(AlertContext)
  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames={'note'} timeout={1000}>
          <li className="list-group-item notes" key={note.id}>
            <div>
              <strong>{note.title}</strong> <small>{note.date}</small>
            </div>
            <button
              onClick={() => {
                alert.show('Заметка удалена!!', 'danger')
                onRemove(note.id)
              }}
              type="button"
              className="btn btn-sm btn-outline-danger"
            >
              &times;
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
