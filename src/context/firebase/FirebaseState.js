import React, { useReducer } from 'react'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import axios from 'axios'
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const addNote = async (title) => {
    try {
      const note = {
        title,
        date: new Date().toJSON(),
      }
      const res = await axios.post(`${url}/notes.json`, note)
      const payload = {
        ...note,
        id: res.data.name,
      }

      dispatch({ type: ADD_NOTE, payload })
      console.log('AddNote:', res.data.name)
    } catch (error) {
      throw error.message
    }

    // dispatch({ type: ADD_NOTE, payload: note })
  }
  
  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`)
    dispatch({ type: REMOVE_NOTE, payload: id })
  }

  const fetchNotes = async () => {
    showLoader()
    const res = await axios.get(`${url}/notes.json`)
    console.log('FetchNotes:', res.data)
    if (res.data) {
      const payload = Object.keys(res.data).map((key) => {
        return {
          ...res.data[key],
          id: key,
        }
      })
      dispatch({ type: FETCH_NOTES, payload })
    }
  }
  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        fetchNotes,
        removeNote,
        loading: state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
