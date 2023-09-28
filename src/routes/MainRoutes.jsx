import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Favourites from '../components/Favourites'

const MainRoutes = () => {
 
    return (
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route path='/' element={<Home />} />
                <Route path='/:place' element={<Home />} />
                <Route path='/favourites' element={<Favourites />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes