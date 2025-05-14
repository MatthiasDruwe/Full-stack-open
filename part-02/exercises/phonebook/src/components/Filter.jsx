export const Filter = ({ onChange, name }) => {
  return <div>
    filter shown with <input onChange={onChange} value={name} />
  </div>
}