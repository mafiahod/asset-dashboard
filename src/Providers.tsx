import React from 'react'
import { Provider } from 'react-redux'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
const Providers: React.FC = ({ children }) => {

    return (
        <Provider store={store}>
            <RefreshContextProvider>
                {children}
            </RefreshContextProvider>
        </Provider>
    )
}
export default Providers