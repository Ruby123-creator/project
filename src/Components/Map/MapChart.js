import React, { useState } from 'react'
import { useEffect ,useMemo } from 'react'
import { MapContainer ,GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './MapChart.css'
import { toast } from 'react-toastify'
import axios from 'axios';
import mapData from '../../Data/countries.json'
import Country from '../CountryDetails/Country';

//styles which provided to the GeoJson element
const countryStyle = {
  fillColor: "#9E072E",
  fillOpacity: 1,
  color: "black",
  weight: 1,
  dashArray:5,
};
const MapChart = () => {
  const [color ,setColor] = useState('yellow')
  // state to change the serach country
  const [searchCountry ,setSearchCountry] = useState('')
  //state changes whenever u selected country
 const [selectedCountry ,setSelectedCountry] = useState(null)
 // to update the country details and set the details
 const [countryDetails ,setCountryDetails] = useState(null)
 // to store the cache info whenever the user selected same country
 const [cache, setCache] = useState({});

 const cachedData = useMemo(() => cache[selectedCountry], [cache, selectedCountry]);

  useEffect(() => {
    //whenever the user click inside the country boundary 
    if (selectedCountry) {
      //fetch the country details
      fetchCountryDetails(selectedCountry);
    }
  }, [selectedCountry]);



  const fetchCountryDetails = async (countryName) => {
    // if countryName is same as in the cacheobject then the data fetch from cache
    if (cache[countryName]) {
      return;
    }

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      console.log(response.data)
      //create a chache object
      setCache((prevCache) => ({
        ...prevCache,
        [countryName]: response.data,
      }));
      setCountryDetails(response.data);
    } catch (error) {
      toast.error('No country Found 🥺', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.error('Error fetching country details:', error.message);
    }

  };


 const  handleSearch =(e)=>{
   
   e.preventDefault()
  //  console.log("hello") 
  
  // wehenver serach btn click it fetch the data 
    fetchCountryDetails(searchCountry)
 }
 
 
  const handleCountryClick=(e,countryName)=>{

    // to change the color of selected country
    e.target.setStyle({
      fillColor:color,
      fillOpacity:1
    })
    // console.log(e.target.feature.properties)
   setSelectedCountry(countryName)
    
  }
 const onEachCountry = (country, layer ) => {
  // get the country name from json file
  const countryName = country.properties.ADMIN;
  // used to popup the countryname whenever it hits the layer boundaries
  layer.bindPopup(countryName);
    
  // this is used to change the different opacity for different countries
    layer.options.fillOpacity = Math.random(); //0-1
    
    //whenever the user click on the particular country area it fetchs the details of that particular country
    layer.on({
      click:(e)=>handleCountryClick(e,countryName),
    });
  };

  return (
    <div  style={{display:'flex' ,flexWrap:'wrap', alignItems:'center' ,justifyContent:'center' ,gap:'5'}} >
    <div className='mapbox' style={{width:'70vw'}}>
        <div className='searchbox'>
          <input type="search" placeholder='Enter Country Name' className='inputbox' value={searchCountry} onChange={(e)=>setSearchCountry(e.target.value)} />
          <button type="submit" onClick={handleSearch}>search</button>
        </div>
       <MapContainer className='mapContainer' zoom={2} center={[20,30]}>
       <GeoJSON
            style={countryStyle}
        
            data={mapData.features}
            onEachFeature={onEachCountry}
          

          />
          <input
          type="color"
          value={color}
          onChange={(e)=>setColor(e.target.value)}
        />
       </MapContainer>
       </div>
       <div>
        {
          // whenver the country details fetched or true then call the country componnet
          countryDetails && <Country  details={countryDetails}/>
        }
       </div>
    </div>
  )
}

export default MapChart