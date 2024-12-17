import React from "react";
import { ThemeProvider } from '../../contexts/ThemeProvider';


function Logo({theme}) {
  return (
      <>
        {theme === 'light' ? (
              <img src="assets/images/logo/logo_dark.svg" width="200px" className="logoHeader" alt="light logo" />
          ) : (
              <img src="assets/images/logo/logo_dark.svg" width="200px" className="logoHeader" alt="dark logo" />
          )}
      </>
  );
}

export default Logo;




