const WeatherIcon = (weatherIcon) => {
    // console.log("flag address",flagAddress)
     return <div><img src={weatherIcon.weatherIcon} className = "weather-icon" alt="icon" /></div>
   }
 
   export default WeatherIcon;