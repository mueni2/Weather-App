import {useState, useEffect, useRef} from 'react'
import {Country, State, City} from 'country-state-city'
import MyContext from './MyContext'
const MyProvider = ({children}) => {
    const countries = useRef(Country.getAllCountries());
    const [countrySelect, setCountrySelect] = useState({
        country: '',
        flag: '',
        countryCode: '',
    });
    const [states, setStates] = useState([]);
    const [stateSelect, setStateSelect] = useState({
        state: '',
        stateCode: '',});
    const [cities, setCities] = useState([]);
    const [citySelect, setCitySelect] = useState('');
    const [data, setData] = useState({
        results: null,
        loading: true,
        error: null,
    });
    const [lat,setLat] = useState({latitude:''})  
    const [long,setLong] = useState({longitude:''}) 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position){
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        })
        console.log(lat,long);

    },[lat,long])

  

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelect},${stateSelect.stateCode},{countrySelect.countryCode}&units=metric&appid=${API_KEY}`;

    /* const URLX = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}35&lon=${location.longitude}139&appid={API_ KEY}` */

    
    useEffect(() => {
        setStates(State.getStatesOfCountry(countrySelect.countryCode));
        setData({
            results: null,
            loading: true,
            error: null
        })
    },[countrySelect]);
    useEffect(() => {
        setCities(City.getCitiesOfState(countrySelect.countryCode, stateSelect.stateCode));
        setData({
            results: null,
            loading: true,
            error: null
        })
    }, [countrySelect, stateSelect])
    useEffect(() => {
        fetch(URL)
        .then((response) => response.json())
        .then((results) => setData({
            results,
            loading: false,
            error: null
        }))
        .catch((error) => setData({
            results: null,
            loading: false,
            error,
        }))
    }, [URL])

  /*   useEffect(() =>{
        fetch(URLX)
        .then((response) => response.json())
      

    },[URLX])
 */

    return (
    <MyContext.Provider value={{
        countries,
        countrySelect,
        setCountrySelect,
        states,
        setStates,
        stateSelect,
        setStateSelect,
        cities,
        setCities,
        citySelect,
        setCitySelect,
        data
    }}>
        {children}
    </MyContext.Provider>
    )
}
export default MyProvider









