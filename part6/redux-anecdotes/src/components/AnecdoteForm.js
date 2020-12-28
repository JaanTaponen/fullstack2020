import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(content))
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={createNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
    </form>
    </>
  )
}

export default AnecdoteForm