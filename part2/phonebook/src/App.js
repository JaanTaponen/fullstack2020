import React, { useState, useEffect } from 'react'
import personService from './service/personService'

const Filter = ({ handleFilterChange }) => {
  return (
    <form >
      <div>filter shown with<input onChange={handleFilterChange}></input>
      </div>
    </form>
  )
}

const PersonForm = ({ newPerson, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={newPerson}>
      <div>name: <input onChange={handleNameChange} /></div>
      <div>number: <input onChange={handleNumberChange} /></div>
      <div><button type="submit" value={newPerson.id}>add</button></div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return message.status ? (
    <div className="success">{message.content}</div>) :
    (<div className="error">{message.content}</div>
    )
}


const Persons = ({ newFilter, persons, deletePerson }) => {
  const numbersToShow = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const names = numbersToShow.map(p =>
    <div key={p.name}>{p.name} {p.number}
      <button value={p.id} onClick={deletePerson}>delete</button>
    </div>
  )
  return (
    <>
      {names}
    </>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [Message, setMessage] = useState(null)

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the number?`)) {
        const singlePerson = persons.find(p => p.name === newName)
        const id = singlePerson.id
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setMessage({ content: `'${returnedPerson.name}' number updated`, status: true })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({ content: `Added '${returnedPerson.name}'`, status: true })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage({ content: error.response.data.error, status: false })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (event) => {
    const personToDelete = persons.find(p => p.id === event.target.value)
    const id = personToDelete.id

    if (window.confirm(`Really want to delete? ${personToDelete.name}`)) {
      personService
        .deleteJSON(id)
        .then(returnedStatus => {
          if (returnedStatus === 204) {
            const updatedPersons = [...persons].filter(p => p.id !== id)
            setPersons(updatedPersons)
          }
        })
        .catch(error => {
          setMessage({ content: `'${personToDelete.name}' was already deleted from the server`, status: false })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        
    }
  }

  //First load
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />

      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} newPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App