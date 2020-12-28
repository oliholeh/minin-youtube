import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { AlertContext } from '../context/alert/alertContext'

export const Alert = () => {
  const { hide, alert } = useContext(AlertContext)

  return (
    <CSSTransition
      in={alert.visible}
      mountOnEnter
      unmountOnExit
      timeout={900}
      classNames={'alert'}
    >
      <div
        className={`alert alert-${alert.type} || 'warning' alert-dismissible`}
        role="alert"
      >
        <strong>Внимание!</strong> {alert.text}
        <button
          type="button"
          onClick={hide}
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </CSSTransition>
  )
}
