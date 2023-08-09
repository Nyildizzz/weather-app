
import './App.css';
import axios from 'axios';
import { useState} from 'react';
import React from 'react';
import { Icon } from '@mui/material';
import { WbSunny, Cloud, CloudQueue, BeachAccess } from '@mui/icons-material';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=22232748b83460a02b03bde266c75492`


    const  searchLocation = (event) =>{
      if(event.key === 'Enter'){
        
      axios.get(url).then((response)  =>{
        setData(response.data);
        console.log(response.data)
        
      })
     }
    }
    const getWeatherIcon = () => {
      // Hava durumu verisinin ana durumunu alın (örneğin "Clear", "Rain" gibi)
      const weatherCondition = data.weather[0].main;
  
      // Farklı hava durumlarını Material-UI İkonlarına eşleştirin
      const weatherIcons = {
        'Clear': <WbSunny />,   // "Clear" durumu için güneş ikonu
        'Clouds': <Cloud />,    // "Clouds" durumu için bulut ikonu
        'Rain': <CloudQueue />, // "Rain" durumu için yağmur bulutu ikonu
        'Snow': <BeachAccess />, // "Snow" durumu için kar ikonu
      };
  
      // Eğer hava durumu koşulları haritalamada yoksa, varsayılan olarak bulut ikonunu döndür
      return weatherIcons[weatherCondition] || <Cloud />;
  };
  
  
  return (
    <div className="app">
      <div className='search'>
        <input type='text'
         placeholder='Search Location'
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          onKeyPress={searchLocation}/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p> {data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className='icon'>
            {data.weather ? <Icon sx={{ fontSize: 48}}>{getWeatherIcon()}</Icon>: null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
          {data.main ? <p className='bold'>{data.main.feels_like}°F</p> : null}
          <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} mph</p> : null}
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
