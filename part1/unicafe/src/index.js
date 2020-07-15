import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, bad, neutral}) => {
  const all = () => good + neutral + bad
  const average = () => (good - bad) / all()
  const positive = () => (good / all() * 100) + " %" 

  if (all() === 0) {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <table>
          <tbody>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="average" value={average()}/>
            <Statistic text="positive" value={positive()}/>
          </tbody>
        </table>
      </>
      )
  }
}

const Statistic = ({text, value}) => {
  return (
  <>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)