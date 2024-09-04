import React from 'react'

const Content = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    return (
    <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {all}</p>
    </div>
  )
}

export default Content