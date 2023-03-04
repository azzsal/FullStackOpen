import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }])
      setNewName('')
      setNewNumber('')
    }
  }

  const shownPersons = searchKey === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchKey={searchKey}
        handler={(event) => setSearchKey(event.target.value)}
      />
      <PersonForm
        addPerson={addPerson}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons shownPersons={shownPersons} />
    </div>
  )
}

export default App