const PersonForm = ({onSubmit, number, setNumber, name, setName}) => <form onSubmit={onSubmit}>
    <div>
        name: <input value={name} onChange={e => setName(e.target.value)}/>
    </div>
    <div>
        number: <input value={number} onChange={e => setNumber(e.target.value)}/>
    </div>

    <div>
        <button type="submit">add</button>
    </div>
</form>;

export default PersonForm;