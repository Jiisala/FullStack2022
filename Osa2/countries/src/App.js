import { useState, useEffect } from "react";
import axios from "axios";
import FullCountryInfo from "./components/Country";




const App = () =>{
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState ('')
  
  
  useEffect(() =>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        setCountries(response.data)
      })
  },[])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const countriesToShow = countries.filter(
    country => country.name.common
    .toLowerCase()
    .includes(newFilter.toLowerCase()))
  
  const handleClick = (countryName) =>{
    setFilter(countryName)
     
  } 
  return (
    <div>
      Find countries <input 
      value ={newFilter}
      onChange ={handleFilterChange}
      />
      {countriesToShow.length >= 10? (
        <div> Too many matches, specify other filter</div>
      ): countriesToShow.length === 1? <div> <FullCountryInfo countriesToShow = {countriesToShow}/></div>
      :<ul>
        {countriesToShow.map(country=>{return<li key = {country.name.common}>
          {country.name.common}<button onClick={() => handleClick(country.name.common)} >show</button></li> 
        })} 
      </ul>
      }

    
   
    </div>

  )}
export default App
//{countriesToShow.length ===1?(<div><Weather city={countriesToShow[0].capital}/></div>
//):<div></div>}