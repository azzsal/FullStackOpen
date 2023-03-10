const Persons = ({ shownPersons, deletePerson }) => {
  return (
    <div>
      {shownPersons.map(person => {
        return (
          <div key={person.id}>
            {person.name} {person.number} &nbsp;
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Persons