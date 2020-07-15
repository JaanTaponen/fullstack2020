import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(anecdotes.map(x => 0))
  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const getMaxAnecdote = () => {
    let idx = votes.indexOf(Math.max(...votes));
    return idx
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <Button text="vote" handleClick={() => handleVotes()}/>
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))}/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[getMaxAnecdote()]}
      <div>has {votes[getMaxAnecdote()]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)