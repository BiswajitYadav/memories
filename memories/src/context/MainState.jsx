import React from 'react'
import MainContext from './mainContext'

const mainState = (props) => {

    return (
        <MainContext.Provider value={{}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default mainState