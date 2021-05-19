import React from 'react'
import Header from './Components/Header'
import Content from './Components/Content'
import Total from './Components/Total'

const App = () => {
  const course = 'Full Stack application development'

  const part1 = {
    name: 'Suneetha Bulla',
    exercises: 10,
  }

  const part2 = {
    name: 'Ramakrishna Undavalli',
    exercises: 7,
  }

  const part3 = {
    name: 'Undavalli Gayatri',
    exercises: 14,
  }

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1.name}
        exercises1={part1.exercises}
        part2={part2.name}
        exercises2={part2.exercises}
        part3={part3.name}
        exercises3={part3.exercises}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App