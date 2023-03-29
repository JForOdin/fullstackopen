import './App.css';
import CountriesService from './services/countriesService';
import {useState,useEffect} from 'react';

function App() {
  const [countries,setCountries] = useState([]);
  var countryDetailsArray = [];
  const [searchForCountry, setSearchForCountry] = useState('');
  const findCountries = (event) => {
     event.preventDefault();  
     setSearchForCountry(event.target[0].value)
   //  console.log("Find countries ",event.target[0].value)
   }
  const FindCountriesForm = ({handleSearchForChange,searchForCountry}) => {
    return (
      <div className="form-div">
        <form onSubmit={findCountries}>
          <div className="country-name">Search for: <input autoFocus="autoFocus" value ={searchForCountry} onChange={handleSearchForChange} /></div>
          <button type="submit">find countries</button>
        </form>
      </div>
    )
  }

  const Languages = (languages) => {
    let langArray = Object.values(languages.languages);
    return (
      <div>
          Languages:
        {langArray.map((language)=><div key ={language}> {language}</div>)}
      </div>
    )
  }
  const ShowDetails = (country) => {
    let languages = country.country.languages;
    let flag = country.country.flag;
    
    if(country.country.showDetails==="true")
    {
      return (
      <div className="country-stats">
        <div>
          Show details: {country.country.showDetails}
        </div>
        <div>
          Capital: {country.country.capital}
        </div>
        <div>
          Region: {country.country.region}
        </div>
        <div>
          Population: {country.country.population}
        </div>
        <div>
          Surface area: {country.country.area}
        </div>
        <div>
          <Languages languages={languages} />
        </div>
        <div>
          Flag: {flag}
        </div>
      </div> )
    }
    else
    {
      console.log("Note showing details on ",country)
      return (
        <div></div>
      )
    } 
  }
  
  const toggleShowDetails = (event) => {

    console.log("show details button click2 ",event.target.attributes.country.value)
    for(let i = 0; i < countryDetailsArray.length; i++)
    {
      if(countryDetailsArray[i].name.common ==event.target.attributes.country.value )
      {
        console.log("found country in country details array");
        console.log("country");
        if(countryDetailsArray[i].showDetails=="false")
        {
          countryDetailsArray[i].showDetails = "true";
          console.log("country",countryDetailsArray[i]);

        }
        else
        {

          countryDetailsArray[i].showDetails = "false";
          console.log("country",countryDetailsArray[i]);

        }
      }
    }
  }

  const ShowDetailsButton = ({country},showdetails,onClick) => {
//    console.log("Show details button",country);
//    console.log("details on: "+showdetails)
    return (
        <button onClick={toggleShowDetails} country={country} showdetails = {showdetails}>Show Details</button>
    )
  } 

  const ListOfCountries = (countries) => {
   
    let allCountries = countries.countries;
    let someCountries = allCountries.filter((country)=>country.name.common.startsWith(searchForCountry))
    countryDetailsArray = [];
    if(someCountries.length>10)
    {
      return <div>Too many countries to list</div>
    }
    
    else if(someCountries.length===1)
    {
      console.log("one country found",someCountries[0].name.common)
      let oneCountry = someCountries[0];
      oneCountry.showDetails = "true";
      return (
        <div className="country-stats-container">
          <h3>{oneCountry.name.common}</h3>
          <ShowDetails country = {oneCountry} />
        </div>
      )
    }
    else {
      for(let i = 0; i < someCountries.length; i++)
      {
        countryDetailsArray.push(someCountries[i]);
        countryDetailsArray[i].showDetails = "false";
      }
    console.log("Some Countries array",someCountries);
    console.log("country details array ",countryDetailsArray)
    return (
      <div>
        {/* {countryDetailsArray.map((country)=><div key ={country.name.common}> {country.name.common} <ShowDetails country={country} /> </div>)} */}
        {countryDetailsArray.map((country)=><div key ={country.name.common}> {country.name.common} <ShowDetailsButton country={country.name.common} showdetails = {country.showDetails} onClick={toggleShowDetails}/><ShowDetails country={country} /> </div>)}
      </div>
    )
    }
  }
  const getCountriesHook = () => {
    CountriesService
      .getAll()
      .then(countriesResponse => {
        setCountries(countriesResponse);
      })
      .catch(error => {
        console.log('failed at getting data from backend')
      })
  };
  useEffect(getCountriesHook, []);
  
  const handleSearchForChange = (event) => {
      setSearchForCountry(event.target.value);
  }
  return (
    <div className="App">
      <div className="List of countries">
        <h3>Countries</h3>
        <ListOfCountries countries = {countries} searchForCountry = {searchForCountry} />
        <FindCountriesForm countries = {countries} handleSearchForChange={handleSearchForChange} searchForCountry = {searchForCountry} />
      </div>
    </div>
  );
}

export default App;
