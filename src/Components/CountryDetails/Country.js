import React from 'react'

const Country = ({details}) => {
  // console.log(details)
    
    
  return (
    <div>
      {
        details && details.map((item ,index)=>{
          return(
            <div className='countryDetails' key={index}>
              <h3>{item?.name.common}</h3>
              <img src={item?.flags.png} alt="flag" />
              <p>
              <span>Area:</span> {item?.area} sq. km</p>
             <p><span>Population</span>:{item?.population}</p>
             
             <p><span>Capital</span>:{item.capital && item.capital[0]}</p>
             <p><span>Languages</span>: {Object.values(item.languages).join(', ')}</p>
             <p><span>Currency</span>: {item.currencies[Object.keys(item.currencies)[0]].name}
             -{item.currencies[Object.keys(item.currencies)[0]].symbol}
             </p>
             <a href={item.maps.googleMaps} target="_blank" rel="noopener noreferrer">Explore More About Country</a>
            </div>
          )
        })
      }
    </div>
  )
}

export default Country