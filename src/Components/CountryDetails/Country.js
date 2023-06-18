import React from 'react'

const Country = ({details}) => {
  // console.log(details)
    
    
  return (
    <div>
      {
        details && details.map((item ,index)=>{
          return(
            <div key={index}>
              <h3>{item?.name.common}</h3>
              <img src={item?.flags.png} alt="flag" />
              <p>Area:{item?.area} sq. km</p>
             <p>Population:{item?.population}</p>
             
             <p>Capital:{item.capital && item.capital[0]}</p>
             <p>Languages: {Object.values(item.languages).join(', ')}</p>
             <p>Currency: {item.currencies[Object.keys(item.currencies)[0]].name}
             -{item.currencies[Object.keys(item.currencies)[0]].symbol}
             </p>

            </div>
          )
        })
      }
    </div>
  )
}

export default Country