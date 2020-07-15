import React from 'react'


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const Content = ({ course }) => {
  const parts = course.parts.map(
      part => <Part key={part.id} part={part} />)

  return (
      <>
          {parts}
          <Total parts={course.parts} />
      </>
  )
}

const Part = ({ part }) => {
  return (
      <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const tsum =
      parts.map(p => p.exercises).reduce((p1, p2) => p1 + p2, 0)
  return (
      <p><b>total of {tsum} exercises</b></p>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}



export default Course