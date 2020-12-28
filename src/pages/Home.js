import React, { Fragment, useContext, useEffect } from 'react'
import { Alert } from '../components/Alert'
import { Form } from '../components/Form'
import { Loader } from '../components/Loader'
import { Notes } from '../components/Notes'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Home = () => {
  // const notes = new Array(8)
  //   .fill('')
  //   .map((_, i) => ({ id: i, title: `Note ${i + 1}` }))
  // const alert = { type: 'warning', text: 'Ви удалили заметку!!' }
  const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext)

  useEffect(() => {
    fetchNotes()
  }, [])
  return (
    <Fragment>
      <h2>Home Page</h2>
      <Alert />
      <Form />
      <hr />
      {loading ? <Loader /> : <Notes notes={notes} onRemove={removeNote} />}
    </Fragment>
  )
}
