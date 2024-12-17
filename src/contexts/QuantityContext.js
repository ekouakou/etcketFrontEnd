import { createContext, useState } from 'react';

export const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
    const [quantities, setFreeTicketQuantities] = useState({});

    return (
        <QuantityContext.Provider value={{ quantities, setFreeTicketQuantities }}>
            {children}
        </QuantityContext.Provider>
    );
};
