import { useState } from 'react'


const AnecdoteOfTheDay = ({ selectedAnecdote, handleVote, handleNextAnecdote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selectedAnecdote}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
    </div>
  )
}

const MostVotedAnecdote = ({ mostVotedAnecdote }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    let random = 0
    do {
      random = Math.floor(Math.random() * anecdotes.length)
    } while (random == selected)
    setSelected(random)
  }

  const handleVote = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)
  }

  const maxVotes = Math.max(...votes)
  const maxVotedIndex = votes.findIndex((e) => e === maxVotes)

  return (
    <div>
      <AnecdoteOfTheDay selectedAnecdote={anecdotes[selected]} handleNextAnecdote={handleNextAnecdote} handleVote={handleVote} />

      <MostVotedAnecdote mostVotedAnecdote={anecdotes[maxVotedIndex]} />
    </div>
  )

}

export default App
