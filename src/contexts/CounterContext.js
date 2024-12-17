import React, { createContext, useState } from 'react';

// Créer le context
export const CounterContext = createContext();

// Fournisseur du context
export const CounterProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    // Fonction pour mettre à jour la valeur
    const updateCount = (value) => {
        setCount( value);
    };

    return (
        <CounterContext.Provider value={{ count, updateCount }}>
            {children}
        </CounterContext.Provider>
    );
};
