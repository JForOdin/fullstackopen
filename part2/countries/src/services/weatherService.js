import axios from 'axios'
const baseURL = "http://api.weatherapi.com/v1/";
const api_key = process.env.REACT_APP_API_KEY

const getCurrentWeather = (region) => {
    console.log("Get current weather region : ",region)

    const url = "current.json?";
    const currentRegion = region;
    const params = "key="+api_key+"&q="+currentRegion+"&aqi=no";
    const request = axios.get(baseURL+url+params);
    return request.then(response => {
        console.log("response",response);
   //     console.log("temperature"+response.data.current.temp_c);
        let weatherArray = {"temp":response.data.current.temp_c,"icon":response.data.current.condition.icon};
        return weatherArray;
    }) 
    
}
export default {getCurrentWeather};