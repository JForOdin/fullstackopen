const ShowPersons = (props) => {
    const contactsToShow = props.showAll
    ? props.persons
    : props.persons.filter(person => person.name.startsWith(props.searchForName));
    return (
      <div>
        <h3>Contacts</h3>  
        {contactsToShow.map((person)=><div key = {person.name} className = "person-div">{person.name} - {person.number}</div>)}
      </div>
    )
} 
export default ShowPersons