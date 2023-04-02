import './App.css';
import CountriesService from './services/countriesService';
import {useState,useEffect} from 'react';
import FindCountriesForm from './components/FindCountryForm';
import weatherService from './services/weatherService';
import FlagImage from './components/FlagImage';
import WeatherIcon from './components/WeatherIcon';
import Languages from './components/Languages';


function App() {

  const [countries,setCountries] = useState([]);
  const [searchForCountry, setSearchForCountry] = useState('');
  const [loadedCountries,setLoadedCountries] = useState(false);
  const [blook,setBlook] = useState('');
  const [temperatures,setTemperatures] = useState([]);
  const clearCountries = () => {
    setSearchForCountry('');
  }
  const handleSearchForChange = (event) => {
    setSearchForCountry(event.target.value);
  }
  const addShowDetails = (countriesResponse) => {
    let id = 0;
    for(let country of countriesResponse)
    {
      country.showDetails = false;
      country.id = id;
      id++;
    }
  }

  const getCapitalFromID = (id) => {
    let result = countries.filter((country) => country.id === Number(id));
    return result[0].capital;
  }

  const toggleDetails = (id,searchForCountry) => {
    let currentCountryID = id.id;
    for(let country of countries)
    {
      if(country.id === currentCountryID)
      {
        if(country.showDetails === false)
        {
          setSearchForCountry(searchForCountry);
          setBlook(Math.random());
          return country.showDetails = true;
        }
        country.showDetails = false;
        setSearchForCountry(searchForCountry);
        setBlook(Math.random());
      }
    }
  }
  const ToggleDetailsButton = ({id,searchForCountry,text}) => {
    return (
      <>
        <button onClick={()=>toggleDetails({id},searchForCountry)} id = {id} >{text}</button>
      </>
    )
  }
  const haveWeatherInfo = (id) => {
    //console.log("checking id "+id)
    for(let temp of temperatures)
    {
      if(id === temp.id)
      {
        return true;
      }
    } 
  }
  const retrieveWeather = (country) => {
   //console.log("retrieve weather service",country)

      if(!haveWeatherInfo(country.id))
      {
          weatherService
                .getCurrentWeather(getCapitalFromID(country.id))
                .then(response => {
                  let regionWeather = {"id": country.id,"temp":response.temp,"icon":response.icon}
                  setTemperatures(temperatures.concat(regionWeather));
                  country.temp = response.temp;
                  country.icon = "http:"+response.icon;
                  //console.log("icon "+country.icon)
             /*   let regionWeather = {"id":country.id,"temp":response};
                setTemperatures(temperatures.concat(regionWeather));
                country.temp = response;*/
              })
      }
  }
  const ListOfCountries = (countries) => {
    let listCountries = countries.countries.filter((country) => country.name.common.startsWith(countries.searchForCountry) || country.name.common.toLowerCase().startsWith(countries.searchForCountry))    
    if(listCountries.length < 10)
    {
        return (
        <div>
          {listCountries.map((country) => {
            let flagAddress = country.flags["png"];
            let iconAddress = country.icon;
            if(country.showDetails)
            {
              retrieveWeather(country);
              return (
                <div className="country-stats" key = {country.id}>
                  <div>
                    <h3>{country.name.common}</h3  >
                    <ToggleDetailsButton id={country.id} searchForCountry = {countries.searchForCountry} text = "Hide Details"/>
                  <div>
                  </div>
                    Capital: {country.capital}
                  </div>
                  <div>
                    Region: {country.region}
                  </div>
                  <div>
                    Population: {country.population}
                  </div>
                  <div>
                    Surface area: {country.area}
                  </div>
                  <div>
                    <Languages languages={country.languages} />
                  </div>
                  <div>
                    <FlagImage flagAddress = {flagAddress}/>
                  </div>
                  <div className= "temperature">
                    Temperature: {country.temp} ºC
                    <WeatherIcon weatherIcon = {iconAddress} />
                  </div>
                </div> )
            
            }
            return (
              <div key = {country.id}>
                {country.name.common}<ToggleDetailsButton id={country.id} searchForCountry = {countries.searchForCountry} text = "Show Details"/>
              </div>
            )}
          )} 
        </div>
      )
    }
    else
    {
      return (
        <div>Too many countries to list</div>
      )
    }
  }
  const getCountriesHook = () => {
    
      if(!loadedCountries)
      {        
        CountriesService
          .getAll()
          .then(countriesResponse => {
            setCountries(countriesResponse);
            addShowDetails(countriesResponse);
            setLoadedCountries(true);
          })
          .catch(error => {
            console.log('failed at getting data from backend'+error)
          });
      }

  };
  
  useEffect(getCountriesHook, []);

  return (
    <div className="App">
      <div>
        <button onClick={clearCountries}>Clear Countries</button>
      </div>
      <div className="list-of-countries">
        <h3>Countries</h3>
        <FindCountriesForm countries = {countries} handleSearchForChange={handleSearchForChange} setSearchForCountry = {setSearchForCountry} searchForCountry = {searchForCountry} />
        <ListOfCountries countries = {countries} searchForCountry = {searchForCountry}/>
      </div>
    </div>
  );
} 

export default App;
