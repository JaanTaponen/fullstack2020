import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({ countries, newFilter, handleButtonPress }) => {
  const countriesToShow = countries.filter(c => c.name
    .toLowerCase()
    .includes(newFilter.toLowerCase()))

  if (newFilter === '') {
    return (<div></div>)
  } else if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />
  } else if (countriesToShow.length > 10) {
    return (<div>Too many matches, specify another</div>)
  } else {
    return (
      countriesToShow.map(c =>
        <div key={c.name}>
          {c.name}
          <button onClick={handleButtonPress} value={c.name}>show</button>
        </div>
      )
    )
  }
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState('')
  const lang = country.languages.map(c => <li key={c.name}>{c.name}</li>)

  useEffect(() => {
    const eventHandler = response => {
      setWeather(response.data)
    }
    axios.get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + country.name).then(eventHandler)
  }, [country])


  return (
    <>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>languages</h2>
      <ul>
        {lang}
      </ul>
      <img src={country.flag} alt="" width="300px"></img>
      <h2>Weather in Helsinki</h2>
      <div><b>temperature: </b>{weather ? weather.current.temperature : ""} Celcius</div>
      <img src={weather ? weather.current.weather_icons[0] : ""} alt=""></img>
  <div><b>wind: </b>{weather ? weather.current.wind_speed : ""} mph direction {weather ? weather.current.wind_dir : ""}</div>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }
  const handleButtonPress = (event) => { setNewFilter(event.target.value) }

  useEffect(() => {
    const eventHandler = response => {
      setCountries(response.data)
      //console.log(response.data)
    }
    axios.get('https://restcountries.eu/rest/v2/all').then(eventHandler)
  }, [])


  return (
    <form>
      <div>find countries: <input onChange={handleFilterChange} /></div>
      <Countries countries={countries} newFilter={newFilter} handleButtonPress={handleButtonPress} />
    </form>
  );
}

export default App;
