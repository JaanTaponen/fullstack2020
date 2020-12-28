import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { set } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  })

  const notification = useSelector(({ notification }) => {
    return notification
  })
  const dispatch = useDispatch()

 
  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(set(`you voted '${anecdotes.find(a => a.id === id).content}'`, 10))
  }

  return (
    <>
      {notification ? <Notification /> : null}
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList