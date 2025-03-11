import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicked = () => setGood(good + 1)
  const handleNeutralClicked = () => setNeutral(neutral + 1)
  const handleBadClicked = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClicked} text='good' />
      <Button onClick={handleNeutralClicked} text='neutral' />
      <Button onClick={handleBadClicked} text='bad' />
      <h1>statistics</h1>
      <Statistics text='good' value={good} />
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />
    </div>
  )
}

export default App
