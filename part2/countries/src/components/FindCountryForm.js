const findCountries = (event,searchForCountry,{setSearchForCountry}) => {
 //   event.preventDefault();  
  //  setSearchForCountry(event.target[0].value)
    console.log("Find countries ",event.target[0].value)
  }
const FindCountriesForm = ({handleSearchForChange,setSearchForCountry,searchForCountry}) => {
    return (
      <div className="form-div">
        <form onSubmit={setSearchForCountry}>
          <div className="country-name">Search for: <input autoFocus="autoFocus" value ={searchForCountry} onChange={handleSearchForChange} /></div>
          <button type="submit">find countries</button>
        </form>
      </div>
    )
  }
  export default FindCountriesForm;
  