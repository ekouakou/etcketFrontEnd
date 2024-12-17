import React from "react";


function Logo({theme}) {
  return (
      <>
        {theme === 'light' ? (
              <img src="assets/images/logo/logo_dark.svg" width="200px"  alt="light logo" />
          ) : (
              <img src="assets/images/logo/logo_dark.svg" width="200px" alt="dark logo" />
          )}
      </>
  );
}

export default Logo;




