import './App.css';
import { useState, useEffect } from 'react';
import ShowPersons from './components/ShowPersons';
import SearchForContact from './components/SearchForContact';
import AddNewContact from './components/AddNewContact.js';
import contactService from './services/contactService';
import Notification from './components/Notification';

const returnLowerCase = (word) => {
  return word.toLowerCase();
}
function App() {
  const [persons, setPersons] =useState([]);
  const [newContact, setNewContact] = useState(''); 
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchForName, setSearchForName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null)


  const hook = () => {
    contactService
      .getAll()
      .then(contactResponse => {
        console.log('promise fulfilled')
        setPersons(contactResponse)
      })
      .catch(error => {
        console.log('failed at getting data from backend')
      })
  };
  useEffect(hook, []);
  
  const addContact = (event) => {
    event.preventDefault();
    for(let i = 0; i < persons.length; i++)
    {
      if(returnLowerCase(persons[i].name) === returnLowerCase(newContact))
      {
        if(window.confirm(`Contact ${newContact} is already in the phonebook. Do you want to replace contact's number with a new one?`))
        {
          persons[i].number = newNumber;
          setNotificationMessage(`${newContact} number changed`)
          setTimeout(() => {
          setNotificationMessage(null)
          }, 5000); 
          return;
        }
      }
    }
      
    const contactObject = {
      name: newContact,
      id: persons.length + 1,
      number: newNumber
    }
    contactService
    .create(contactObject)
    .then(response => {
      console.log(response);
      setPersons(persons.concat(contactObject));
      setNewNumber('');
      setNewContact('');
      setNotificationMessage(`${newContact} has been added to contact list`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    })
    .catch(error => {
      setNotificationMessage(
        `Note '${error}' was already removed from server`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    });
    
  }
  const findContact = (event) => {
    event.preventDefault();  
    setShowAll(false);
  }
  const handleSearchContactChange = (event) => {
    setSearchForName(event.target.value);
  }
  const handleContactChange = (event) => {
    console.log(event.target.value);
    setNewContact(event.target.value);
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }
 

  return (
    <div className = "main">
      <div className ="ui-container">
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} />

        <SearchForContact searchForName={searchForName} handleSearchContactChange={handleSearchContactChange} findContact = {findContact} />
        <AddNewContact addContact = {addContact} newContact={newContact} handleContactChange={handleContactChange} handleNumberChange={handleNumberChange} />
      </div>
      
      <div className="data-container">
        <ShowPersons persons = {persons} showAll = {showAll}  searchForName = {searchForName} />
      </div>
    </div> 
  );
}

export default App;
