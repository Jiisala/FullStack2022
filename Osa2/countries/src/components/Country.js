import Weather from "./Weather"
const FullCountryInfo = ({countriesToShow}) =>{
  return(
    <div>
        {countriesToShow.map(country=>{
          return <div key = {country.name.common}>
          <h1>{country.name.common}</h1>
          <p>capital: {country.capital} <br/>
          area: {country.area}km^2<br/>
          </p>
          <h2>Languages</h2>
          <ul>{Object.keys(country.languages).map((language) => (<li key={language}>{language}</li>))}
          </ul>
          <img src={country.flags['png']}/>
          <Weather city={country.capital}/>
          </div>
        })}
        
        
      </div>
  )

}

export default FullCountryInfo

