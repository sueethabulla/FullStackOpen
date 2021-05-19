import React from 'react'

const Total = props => {
  let total = 0;
  const sum = props.parts.map(obj => total += obj.exercises)

  return (
    <div>
      <p>Number of exercises {total}</p>
      <p>Number of exercises {sum}</p>
</div>
    
  )
}
export default Total