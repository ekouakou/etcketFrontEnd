import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/ThemeProvider';
import { HeaderProvider } from './contexts/HeaderContext';
import { CartProvider } from './contexts/CartContext'; // Importer le CartProvider
// import { QuantityProvider } from './/contexts/QuantityContext';
import { CounterProvider } from './contexts/CounterContext'; // Import the context



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <CounterProvider>
      <HeaderProvider>
        <CartProvider> {/* Utiliser le CartProvider ici */}
          <App />
        </CartProvider>
      </HeaderProvider>
      </CounterProvider>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
