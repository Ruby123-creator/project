import React, { useState } from 'react'
import { useEffect } from 'react'
import { MapContainer ,GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './MapChart.css'
import axios from 'axios';
import mapData from './../Data/countries.json'
import Country from './CountryDetails/Country';
const countryStyle = {
  fillColor: "red",
  fillOpacity: 1,
  color: "black",
  weight: 1,
  dashArray:5,
};
const MapChart = () => {
  const [color ,setcolor] = useState("#ffff00")
  const [searchCountry ,setSearchCountry] = useState('')
 const [selectedCountry ,setSelectedCountry] = useState(null)
 const [countryDetails ,setCountryDetails] = useState(null)
  useEffect(() => {
    if (selectedCountry) {
      fetchCountryDetails(selectedCountry);
    }
  }, [selectedCountry]);



  const fetchCountryDetails = async (countryName) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      // const data = await response.json();
      // console.log(data)
      setCountryDetails(response.data);
    } catch (error) {
      alert("No country Found")
      console.error('Error fetching country details:', error);
    }
  };


 const  handleSearch =(e)=>{
   e.preventDefault()
    fetchCountryDetails(searchCountry)
 }
 
 const changeCountryColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: color,
      fillOpacity: 1,
    });
  };
  const handleCountryClick=(event )=>{    
      

    const countryCode = event.target.feature.properties.ADMIN
    setSelectedCountry(countryCode)
    
  }
 const onEachCountry = (country, layer ) => {
  const countryName = country.properties.ADMIN;
  layer.bindPopup(countryName);
    
    layer.options.fillOpacity = Math.random(); 
     
    layer.on({
      click: handleCountryClick,
    });
  };
//  const colorChange = (event) => {
//   setcolor(event.target.value)
//   };
  
  // console.log(countries)
  return (
    <div style={{display:'flex' ,flexWrap:'wrap'}} >
    <div style={{width:'70vw'}}>
        <div>
          <input type="search" name="" id="" value={searchCountry} onChange={(e)=>setSearchCountry(e.target.value)} />
          <button type="submit" onClick={handleSearch}>submit</button>
        </div>
       <MapContainer zoom={2} center={[20,100]} style={{height:'80vh'}}>
       <GeoJSON
            style={countryStyle}
            data={mapData.features}
            onEachFeature={onEachCountry}
          

          />
          {/* <input type="color" 
           value={color}
           onChange={colorChange}

           /> */}
       </MapContainer>
       </div>
       <div>
        {
          selectedCountry && <Country  details={countryDetails}/>
        }
       </div>
    </div>
  )
}

export default MapChart