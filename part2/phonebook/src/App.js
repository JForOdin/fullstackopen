import './App.css';
import { useState } from 'react'

function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newContact, setNewContact] = useState(''); 
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchForName, setSearchForName] = useState('');
  
  
  const findContact = (event) => {
    event.preventDefault();
    setShowAll(false);
    console.log("Event form find contact : ",event)
  }
  const addContact = (event) => {
    event.preventDefault();
    console.log("addContact :"+newContact);
    for(let i = 0; i < persons.length; i++)
    {
      if(persons[i].name === newContact)
        return window.alert(`${newContact} is already in the phonebook.`);
    }
      
    const contactObject = {
      name: newContact,
      id: persons.length + 1,
      number: newNumber
    }
    setPersons(persons.concat(contactObject));
    setNewContact('');
    setNewNumber('');
  }
  const handleContactChange = (event) => {
    console.log(event.target.value);
    setNewContact(event.target.value);
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }
  const handleSearchContactChange = (event) => {
    console.log(event.target.value);
    setSearchForName(event.target.value);
  }
  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.name.startsWith(searchForName));
    
  const ShowPersons = (props) => {
   
      return (
        <div>
          {contactsToShow.map((person)=><div key = {person.name} className = "person-div">{person.name} - {person.number}</div>)}
        </div>
      )
   
  }
  return (
    <div className = "main">
      <div className ="ui-container">
        <h2>Phonebook</h2>
        <h3>Search for Contact</h3>
        <form onSubmit={findContact}>
          <div className="name">Name: <input value ={searchForName} onChange={handleSearchContactChange}/></div>
          <button type="submit">find</button>
        </form>
        <form onSubmit={addContact} className="submit-contact">
          <div>
            <h3>Add Contact</h3>
            <div className="add-contact">
              <div className="name">Name: <input value ={newContact} onChange={handleContactChange}/></div>
              <div className="number">Number: <input value ={newNumber} onChange={handleNumberChange}/></div>
            </div>
            <button type="submit">save</button>
          </div>
        </form>
      </div>
      
      <div className="data-container">
        <h3>Numbers</h3>  
        <ShowPersons people = {persons} showAll = {showAll} searchForName = {searchForName}/>
      </div>

    </div>
    
  );
}

export default App;
