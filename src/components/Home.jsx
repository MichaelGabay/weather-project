import React, { useEffect, useState } from 'react'
import SearchPlace from './SearchPlace';
import DisplayWeather from './DisplayWeather';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import BASE_URL from '../urls';
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"
import { getDayName, getMonthName } from '../utils/utils';
const Home = () => {
    const [dateTimeFormat, setDateTimeFormat] = useState("")
    const { place } = useParams()
    const [weather, setWether] = useState({})
    const [time, setTime] = useState(new Date().toLocaleTimeString().substring(0, 5))
    const [showCOrF, setShowCOrF] = useState(true)
    const nav = useNavigate()
    // initialize controller
    useEffect(() => {
        if (!place) {
            updateWeatherByCurrentLocation()
            updateDateTimeFormat()
        }
    }, [])

    useEffect(() => {
        if (place) {
            updateWeatherByPlace(place)
        }
    }, [place])

    const updateDateTimeFormat = () => {
        const date = new Date()
        const dayName = getDayName(date)
        const monthName = getMonthName(date)
        setDateTimeFormat(`${dayName}, ${date.getDate()} ${monthName} ${date.getFullYear()} | Local time: `)
        setInterval(() => {
            setTime(new Date().toLocaleTimeString().substring(0, 5))
        }, 1000 * 60)
    }

    const updateWeatherByCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            // success callback
            async position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                try {
                    const { data: { plus_code: { compound_code } } } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC7mV1q7DXSFk5LqUMFMEtupM2qxFdRtHk`)
                    const placeWords = compound_code.split(" ")
                    const placeName = placeWords.slice(1).join(" ")
                    nav("/" + placeName)
                } catch (error) {
                    nav("/tel aviv, israel")
                }
            },
            // failed callback
            () => {
                nav("/tel aviv, israel")
            }
        )
    }

    const updateWeatherByPlace = async (placeName) => {
        const results = await geocodeByAddress(placeName)
        const latLng = await getLatLng(results[0])
        const customLatLng = latLng.lat + ',' + latLng.lng;
        const { data } = await axios.get(`${BASE_URL}${customLatLng}`);
        setWether(data)
    }
    return (
        <>
            <div className='flex text-white justify-center' >
                <SearchPlace />
                <div className='flex'>

                    <TbTemperatureCelsius onClick={() => setShowCOrF(true)} size={30} cursor="pointer" className='ml-2' />
                    <p className='mx-1'>|</p>
                    <TbTemperatureFahrenheit onClick={() => setShowCOrF(false)} size={30} cursor="pointer" />
                </div>
            </div>
            <p className='text-gray-200 text-center text-lg mt-4'>{dateTimeFormat + time}</p>
            <DisplayWeather showCOrF={showCOrF} weather={weather} />
        </>
    );
}


export default Home
