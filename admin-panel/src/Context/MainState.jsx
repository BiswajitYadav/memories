import React, { useState } from 'react'
import MainContext from '../Context/MainContext'

const MainState = (props) => {

    const [navOpen, setNavOpen] = useState(false)

    return (
        <MainContext.Provider value={{ navOpen, setNavOpen }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState