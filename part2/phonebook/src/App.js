import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          notifyWith(`Added ${returnedPerson.name}`)
        })
    } else {
      if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        updatePerson(existingPerson.id)
      }
    }
  }

  const updatePerson = (id) => {
    const existingPerson = persons.find(p => p.id === id)
    personService
      .update(id, { ...existingPerson, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        notifyWith(`Updated ${returnedPerson.name}`)
      })
      .catch(err => {
        notifyWith(`Information of ${existingPerson.name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.id !== existingPerson.id))
      })
  }

  const deletePerson = (id) => {
    const toDelete = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${toDelete.name} ?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(err => {
          notifyWith(`${toDelete.name} has already been removed from the server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const shownPersons = searchKey === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons shownPersons={shownPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App