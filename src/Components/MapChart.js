import React, { useState } from 'react'
import { useEffect } from 'react'
import { MapContainer ,GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './MapChart.css'
import axios from 'axios';
import mapData from './../Data/countries.json'
import Country from './CountryDetails/Country';
const countryStyle = {
  fillColor: "#9E072E",
  fillOpacity: 1,
  color: "black",
  weight: 1,
  dashArray:5,
};
const MapChart = () => {
  const [searchCountry ,setSearchCountry] = useState('')
 const [selectedCountry ,setSelectedCountry] = useState(null)
 const [countryDetails ,setCountryDetails] = useState(null)
  useEffect(() => {
    if (selectedCountry) {
      console.log("hello")
      fetchCountryDetails(selectedCountry);
    }
  }, [selectedCountry]);



  const fetchCountryDetails = async (countryName) => {
    console.log("hello")
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      console.log(response.data)
      setCountryDetails(response.data);
    } catch (error) {
      alert("No country Found")
      console.error('Error fetching country details:', error);
    }
  };


 const  handleSearch =(e)=>{

   e.preventDefault()
  //  console.log("hello") 

    fetchCountryDetails(searchCountry)
 }
 
 
  const handleCountryClick=(countryName)=>{
   setSelectedCountry(countryName)
    
  }
 const onEachCountry = (country, layer ) => {
  const countryName = country.properties.ADMIN;
  layer.bindPopup(countryName);
    
    layer.options.fillOpacity = Math.random(); 
     
    layer.on({
      click:()=>handleCountryClick(countryName),
    });
  };

  return (
    <div style={{display:'flex' ,flexWrap:'wrap', alignItems:'center' ,justifyContent:'center' ,gap:'5'}} >
    <div style={{width:'70vw'}}>
        <div className='searchbox'>
          <input type="search" placeholder='Enter Country Name' className='inputbox' value={searchCountry} onChange={(e)=>setSearchCountry(e.target.value)} />
          <button type="submit" onClick={handleSearch}>search</button>
        </div>
       <MapContainer zoom={2} center={[20,30]} style={{height:'80vh'}}>
       <GeoJSON
            style={countryStyle}
            data={mapData.features}
            onEachFeature={onEachCountry}
          

          />
          
       </MapContainer>
       </div>
       <div>
        {
          countryDetails && <Country  details={countryDetails}/>
        }
       </div>
    </div>
  )
}

export default MapChart