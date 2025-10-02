const Person = ({name, number, onDeleteClicked}) => <div>{name} {number}
    <button onClick={onDeleteClicked}>delete</button>
</div>

export default Person;