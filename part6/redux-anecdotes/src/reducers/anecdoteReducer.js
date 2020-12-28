import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToEdit = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToEdit, 
        votes: anecdoteToEdit.votes + 1
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnecdote 
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id)
    console.log(`nauraa`, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id },
    })
  }
}


export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default reducer