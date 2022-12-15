import React, { useState } from "react"

const initialGlobal = {
    title: '',
    breadcrumbs: [],
    screenWidth: ''
}

const GlobalContext = React.createContext({ global: initialGlobal, setGlobal: (val) => {} })

const GlobalProvider = ({ children }) => {
    const [global, setGlobal] = useState(initialGlobal)

    return (
        <GlobalContext.Provider value={{ global, setGlobal }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }