import React, { useEffect } from 'react';

const SeatMap = () => {
  useEffect(() => {
    const createSeats = (seatPositions) => {
      const svgWrapper = document.getElementById('svg-wrapper');
      // Efface le contenu existant de svgWrapper avant d'ajouter les nouveaux sièges
      svgWrapper.innerHTML = '';

      seatPositions.forEach((cat) => {
        console.log(cat);
        const quotien = cat.nbreSeat / cat.nbreSeatRanger;
        let nbreS = 0;
        let initValue = 0;
        let position_x = 0;
        let position_y = 0;

        nbreS = cat.nbreSeat < cat.nbreSeatRanger ? cat.nbreSeat : cat.nbreSeatRanger;
        initValue = cat.nbreSeat;

        // Crée un div pour la catégorie
        const catDiv = document.createElement('div');
        catDiv.setAttribute('id', cat.Cat);
        svgWrapper.appendChild(catDiv);

        // Créez le nouvel élément SVG pour la catégorie
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('version', '1.1');

        // Créez le style SVG
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.setAttribute('type', 'text/css');
        style.textContent = '.st0{fill:#191F3A;stroke:#2A457A;stroke-miterlimit:10;}.st1{fill:#FFFFFF;}.st2{font-family:\'MyriadPro-Regular\';}.st3{font-size:2.8756px; text-align: center;}';
        svg.appendChild(style);

        // Créez le titre de la catégorie
        const title = document.createElement('h5');
        title.textContent = cat.Cat;
        title.classList = "subtitle mt-5 category";
        catDiv.appendChild(title);

        const catDivScroll = document.createElement('div');
        catDivScroll.setAttribute('id', cat.Cat);
        catDiv.appendChild(catDivScroll);

        for (let j = 0; j < quotien; j++) {
          for (let k = 0; k < nbreS; k++) {
            designSeat(position_x, position_y, cat.Cat + " " + j + " ", k, svg);
            position_x += 30; // You may adjust this value as needed for spacing between seats
          }
          initValue = initValue - nbreS;
          nbreS = nbreS <= initValue ? nbreS : initValue;
          position_x = 0;
          position_y += 30;
        }
        catDiv.appendChild(svg);

        const bbox = svg.getBBox(); // Obtient les coordonnées de la boîte englobante de tous les éléments SVG

        // Met à jour le viewBox en fonction des coordonnées de la boîte englobante
        svg.setAttribute('viewBox', bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height);
      });
    }

    const designSeat = (position_x, position_y, seatNumber, additionalText, svg) => {
      const positions = [{ x: parseInt(position_x), y: parseInt(position_y) }];

      const groupesData = [{
        textContent: seatNumber,
        pathsData: [
          { class: 'st0', d: 'M4.8,16.7h12.5V7c0-0.8,0.4-1.6,1-2.2l1.8-1.4l-2.5-2.5C17.1,0.3,16.4,0,15.6,0H6.1C5.3,0,4.5,0.3,3.9,1L1.7,3.4l2,1.5c0.7,0.5,1,1.3,1,2.2L4.8,16.7L4.8,16.7z' },
          { class: 'st0', d: 'M4.8,16.6V7c0-0.8-0.4-1.6-1-2.2l-2-1.5l-1,1.1C0.3,5,0,5.7,0,6.5v9.8c0,0.9,0.4,1.8,1.2,2.4l1.5,1.1l2.1-3.1L4.8,16.6L4.8,16.6z' },
          { class: 'st0', d: 'M17.3,16.6v0.1l2,2.9l1.5-1.1c0.8-0.6,1.2-1.5,1.2-2.4V6.5c0-0.8-0.3-1.5-0.8-2.1l-0.9-1l-1.8,1.4c-0.7,0.5-1,1.3-1,2.2L17.3,16.6L17.3,16.6z' },
          { class: 'st0', d: 'M17.3,16.7H4.8l0,0l-2.1,3.1l1.4,1c0.5,0.4,1.1,0.6,1.8,0.6h10c0.6,0,1.3-0.2,1.8-0.6l1.6-1.2L17.3,16.7L17.3,16.7z' },
        ],
      }];

      positions.forEach(function (position, index) {
        creerEtDeplacerGroupe(position.x, position.y, groupesData[index].textContent, additionalText, groupesData[index].pathsData, svg);
      });
    }

    const creerEtDeplacerGroupe = (x, y, textContent, additionalTextContent, pathsData, svg) => {
      const interval = 0;
      //const yInitial = 0;
      const groupe = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      groupe.setAttribute('transform', 'translate(' + (interval + x) + ',' + (interval + y) + ')');

      pathsData.forEach(function (pathData) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', pathData.class);
        path.setAttribute('d', pathData.d);
        groupe.appendChild(path);
      });

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('transform', 'matrix(1 0 0 1 7.6837 10.046)'); // You can adjust the transform matrix as needed
      text.setAttribute('class', 'st1 st2 st3');
      text.textContent = textContent;
      groupe.appendChild(text);

      // Ajoutez un autre élément texte pour le texte supplémentaire
      if (additionalTextContent) {
        const additionalText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        additionalText.setAttribute('transform', 'matrix(1 0 0 1 8.5611 13.2386)'); // Ajustez la position en fonction de vos besoins
        additionalText.setAttribute('class', 'st1 st2 st3');
        additionalText.textContent = additionalTextContent;
        groupe.appendChild(additionalText);
      }

      svg.appendChild(groupe);
    }

    const seatPositions = [
      { Cat: "VVIP", nbreSeat: 100, nbreSeatRanger: 20 },
        { Cat: "VIP", nbreSeat: 100, nbreSeatRanger: 20 },
        { Cat: "Pass", nbreSeat: 50, nbreSeatRanger: 20 },
    ];

    createSeats(seatPositions);
  }, []);

  return (
    <div id="category-scroll" className="category-scroll">
      <div id="svg-wrapper"></div>
    </div>
  );
}

export default SeatMap;
