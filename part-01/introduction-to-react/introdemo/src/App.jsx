const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const app = () => {
  const name = "Peter"
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={10+10}/>
      <Hello name={name} age={age}/>
    </div>
  )
}

export default app