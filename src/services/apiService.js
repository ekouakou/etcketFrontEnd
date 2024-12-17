// src/services/apiService.js

import axios from 'axios';

const getRootUrl = (port) => {
  const originWithoutPort = window.location.protocol + '//' + window.location.hostname;
  const defaultPort = "80";
  const baseUrl = "/eticketbackend/backoffice/webservices/";
  //const baseUrl = "/backoffice/webservices/";
  // const baseUrl = "/webservices/";
  const finalPort = port ? port : defaultPort;
  return `http://192.168.1.4:${finalPort}/`;
  //return `${originWithoutPort}:${finalPort}${baseUrl}`;
};


// const getFullUrl = () => {
//   const { protocol, hostname, port } = window.location;
//   const portPart = port ? `:${port}` : '';
//   return `${protocol}//${hostname}/`;
// };

const getFullUrl = () => {
  const { protocol, hostname, port } = window.location;
  const portPart = port ? `:${port}` : '';
  return `http://guineeticket.com/`;
  // return `${protocol}//${hostname}/`;
};






const fullUrl = getFullUrl();

// +++++++++++++++ FONCTION +++++++++++++++++++

const urlBaseImage = "eticketbackend/backoffice/"//alert(fullUrl+urlBaseImage); backoffice
const rootUrl = fullUrl + "eticketbackend/backoffice/webservices/"; //Production //eticketbackend/
localStorage.setItem("urlBaseImage", fullUrl + urlBaseImage);
localStorage.setItem("fullUrl", fullUrl);






const fetchEvenements = (params) => {
  return axios.post(`${rootUrl}TicketManager.php`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

// Vous pouvez ajouter d'autres fonctions pour d'autres appels API ici
// Par exemple, une fonction pour obtenir les détails d'un événement
const fetchEvenementDetails = (eventId) => {
  const params = {
    mode: 'getEvenementDetails',
    LG_EVENID: eventId
    //STR_UTITOKEN: 'wzpjku2dvokriz3phgop',
  };

  return axios.post(`${rootUrl}TicketManager.php`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};


const doConnexion = (params) => {
  return axios.post(`${rootUrl}CustomerManager.php`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

const doDisConnexion = (params) => {
  return axios.post(`${rootUrl}Authentification.php`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

const crudData = (params,apiUrl) => {
  return axios.post(`${rootUrl}${apiUrl}`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};





const currentYear = new Date().getFullYear(); // Obtenir l'année en cours
const firstDayOfYear = new Date(currentYear, 0, 1); // 1er janvier de l'année en cours
const today = new Date(); // Date du jour



// Formater les dates en 'YYYY-MM-DD' (en retirant la partie heure)
const formatDate = (date) => date.toISOString().split('T')[0];

// Obtenir la date du dernier jour du mois prochain

const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Obtenir le dernier jour du mois prochain
// on peut changer le nombre de mois (2)


// Stocker dans le localStorage
localStorage.setItem('DT_BEGIN', formatDate(firstDayOfYear));
localStorage.setItem('today', formatDate(today));

const date = {
  firstDayOfYear: formatDate(firstDayOfYear),
  // today: formatDate(today),
  today: formatDate(nextMonth),
};

const mode = {
  listBanniereMode: 'listBanniere',
  listEvenementFrontMode: 'listEvenementFront',
  getEvenementMode: 'getEvenement',
  createTicketMode:'createTicket',
  verifypaymentMode:'verifypayment',
  listNewsEvenementMode:'listNewsEvenement',
  listCategorieplaceEvenementMode:'listCategorieplaceEvenement',
  
};

localStorage.setItem("appMode", JSON.stringify(mode));
localStorage.setItem("appDate", JSON.stringify(date));
localStorage.setItem("appDevise", "GNF");


export { fetchEvenements, fetchEvenementDetails, doConnexion, doDisConnexion , crudData};
